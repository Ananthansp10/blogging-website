import api from './api';

export interface Post {
  _id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePostData {
  title: string;
  content: string;
}

export interface UpdatePostData {
  title: string;
  content: string;
}

export const postsService = {
  async getPosts(): Promise<Post[]> {
    const response = await api.get('/api/posts');
    return response.data;
  },

  async createPost(data: CreatePostData): Promise<Post> {
    const response = await api.post('/api/posts', data);
    return response.data;
  },

  async updatePost(id: string, data: UpdatePostData): Promise<Post> {
    const response = await api.put(`/api/posts/${id}`, data);
    return response.data;
  },

  async deletePost(id: string): Promise<void> {
    await api.delete(`/api/posts/${id}`);
  },
};
