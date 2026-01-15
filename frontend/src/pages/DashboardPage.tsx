import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { userLogout } from '../services/authService';
import { toast } from 'react-toastify';
import { addPost, deletePost, editPost, getPost } from '../services/postServices';

interface BlogPost {
  _id: string;
  title: string;
  content: string;
  author: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

interface User {
    userName:string;
    email:string;
    userId:string;
}

const DashboardPage: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [user, setUser] = useState<User | null>(null);
  
  const [formData, setFormData] = useState({ title: '', content: '' });
  const [errors, setErrors] = useState({ title: '', content: '' });

  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('userDetails');
    if(userData){
        const userDetails = JSON.parse(userData)
        setUser(userDetails)
    }
  }, [navigate]);

  const fetchPosts = async (userId:string) => {
    try {
      const response = await getPost(userId)
      setPosts(response.data.data.filter((post: BlogPost) => !post.isDeleted));
    } catch (error) {
      console.error('Failed to fetch posts');
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors: any = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    else if (formData.title.length < 5) newErrors.title = 'Title must be at least 5 characters';
    if (!formData.content.trim()) newErrors.content = 'Content is required';
    else if (formData.content.length < 20) newErrors.content = 'Content must be at least 20 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      if (editingPost) {
        editPost(editingPost._id,{...formData,author:user?.userId ?? ''}).then((response)=>{
            toast.success(response.data.message)
        })
      } else {
        addPost({...formData,author:user?.userId ?? ''}).then((response)=>{
            toast.success(response.data.message)
        }).catch((error)=>{
            toast.error(error.response.data.message)
        })
      }
      fetchPosts(user?.userId ?? '');
      closeModals();
    } catch (error: any) {
      console.error('Submit error:', error.response?.data);
    }
  };

  const handleDelete = async (postId: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;
    try {
      deletePost(postId).then((response)=>{
        toast.success(response.data.message)
        fetchPosts(user?.userId ?? '');
      }).catch((error)=>{
        toast.error(error.response.data.message)
      })
    } catch (error) {
      console.error('Delete error')
    }
  };

  useEffect(()=>{
    if(user){
        fetchPosts(user.userId)
    }
  },[user])

  const handleLogout = () => {
    userLogout().then((response)=>{
        toast.success(response.data.message)
        localStorage.removeItem("userDetails")
        navigate('/')
    }).catch((error)=>{
        toast.error(error.response.data.message)
    })
  };

  const openEditModal = (post: BlogPost) => {
    setEditingPost(post);
    setFormData({ title: post.title, content: post.content });
    setShowEditModal(true);
  };

  const closeModals = () => {
    setShowAddModal(false);
    setShowEditModal(false);
    setEditingPost(null);
    setFormData({ title: '', content: '' });
    setErrors({ title: '', content: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name as keyof typeof errors]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Blog Dashboard</h1>
              <p className="text-gray-600 mt-1">Manage your blog posts</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm text-gray-500">Welcome</p>
                <p className="font-bold text-lg text-gray-900">{user?.userName}</p>
              </div>
              <button
                onClick={() => setShowAddModal(true)}
                className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-bold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
              >
                + Add New Blog
              </button>
              <button
                onClick={handleLogout}
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Posts Grid */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        {posts.length === 0 ? (
          <div className="text-center py-24">
            <svg className="w-24 h-24 text-gray-400 mx-auto mb-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No blog posts yet</h3>
            <p className="text-gray-600 mb-8">Get started by creating your first blog post.</p>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Create First Post
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <div key={post._id} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden group">
                <div className="p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-emerald-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-6 line-clamp-3 text-sm leading-relaxed">
                    {post.content}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-6">
                    <span>Created: {new Date(post.createdAt).toLocaleDateString()}</span>
                    <span>{Math.floor(post.content.length / 100)} min read</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => openEditModal(post)}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2.5 px-4 rounded-xl transition-all duration-200 transform hover:-translate-y-0.5"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(post._id)}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white text-sm font-medium py-2.5 px-4 rounded-xl transition-all duration-200 transform hover:-translate-y-0.5"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Add Blog Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Create New Blog Post</h2>
              <button
                onClick={closeModals}
                className="text-gray-500 hover:text-gray-700 text-2xl font-bold hover:scale-110 transition-all duration-200"
              >
                ×
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-bold text-gray-700">Title</label>
                <input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={`w-full p-4 border-2 rounded-2xl text-lg font-semibold focus:ring-4 focus:ring-blue-200 focus:border-blue-400 transition-all ${
                    errors.title ? 'border-red-300 bg-red-50' : 'border-gray-200'
                  }`}
                  placeholder="Enter your blog title..."
                />
                {errors.title && <p className="text-red-600 text-sm font-medium">{errors.title}</p>}
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-bold text-gray-700">Content</label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  rows={10}
                  className={`w-full p-4 border-2 rounded-2xl text-base focus:ring-4 focus:ring-blue-200 focus:border-blue-400 transition-all ${
                    errors.content ? 'border-red-300 bg-red-50' : 'border-gray-200'
                  }`}
                  placeholder="Write your blog content here..."
                />
                {errors.content && <p className="text-red-600 text-sm font-medium">{errors.content}</p>}
              </div>
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={closeModals}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-4 px-6 rounded-2xl transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-bold py-4 px-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-200"
                >
                  Publish Blog
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Blog Modal */}
      {showEditModal && editingPost && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Edit Blog Post</h2>
              <button
                onClick={closeModals}
                className="text-gray-500 hover:text-gray-700 text-2xl font-bold hover:scale-110 transition-all duration-200"
              >
                ×
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-bold text-gray-700">Title</label>
                <input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={`w-full p-4 border-2 rounded-2xl text-lg font-semibold focus:ring-4 focus:ring-blue-200 focus:border-blue-400 transition-all ${
                    errors.title ? 'border-red-300 bg-red-50' : 'border-gray-200'
                  }`}
                  placeholder="Enter your blog title..."
                />
                {errors.title && <p className="text-red-600 text-sm font-medium">{errors.title}</p>}
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-bold text-gray-700">Content</label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  rows={10}
                  className={`w-full p-4 border-2 rounded-2xl text-base focus:ring-4 focus:ring-blue-200 focus:border-blue-400 transition-all ${
                    errors.content ? 'border-red-300 bg-red-50' : 'border-gray-200'
                  }`}
                  placeholder="Write your blog content here..."
                />
                {errors.content && <p className="text-red-600 text-sm font-medium">{errors.content}</p>}
              </div>
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={closeModals}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-4 px-6 rounded-2xl transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 px-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-200"
                >
                  Update Blog
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
