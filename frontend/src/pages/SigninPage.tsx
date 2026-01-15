import React, { useState, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { userLogin } from '../services/authService';
import { toast } from 'react-toastify';

interface FormData {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
  general?: string;
}

const SigninPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({ email: '', password: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!emailRegex.test(formData.email)) newErrors.email = 'Please enter valid email';

    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';

    return newErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await userLogin(formData)
      toast.success(response.data.message)
      localStorage.setItem("userDetails",JSON.stringify(response.data.data))
      navigate('/dashboard');
    } catch (error: any) {
       toast.error(error.response.data.message)
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl">
        <div>
          <h2 className="text-center text-3xl font-bold text-gray-900">Welcome Back</h2>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {errors.general && (
            <div className="p-4 bg-red-50 border border-red-200 text-red-800 rounded-xl text-sm">
              {errors.general}
            </div>
          )}
          
          {/* Email Field */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-xl border-2 transition-all ${
                errors.email 
                  ? 'border-red-300 bg-red-50 focus:border-red-400' 
                  : 'border-gray-200 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200'
              }`}
              placeholder="Enter email"
            />
            {errors.email && (
              <p className="text-red-600 text-sm font-medium">{errors.email}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-3 pr-12 rounded-xl border-2 transition-all ${
                  errors.password 
                    ? 'border-red-300 bg-red-50 focus:border-red-400' 
                    : 'border-gray-200 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200'
                }`}
                placeholder="Enter password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-600 text-sm font-medium">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl transition-all disabled:opacity-50"
          >
            {isSubmitting ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
        <div className="text-center space-y-2 text-sm">
          <Link to="/forgot-password" className="text-emerald-600 font-medium hover:underline block">
            Forgot Password?
          </Link>
          <p>
            Don't have account? <Link to="/register" className="text-emerald-600 font-bold hover:underline">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SigninPage;
