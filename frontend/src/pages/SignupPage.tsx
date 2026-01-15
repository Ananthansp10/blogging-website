import React, { useState, FormEvent } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { userRegister } from '../services/authService';
import { toast } from 'react-toastify';

export interface FormData {
  userName: string;
  email: string;
  phoneNumber: string;
  password: string;
}

interface FormErrors {
  userName?: string;
  email?: string;
  phoneNumber?: string;
  password?: string;
  general?: string;
}

const SignupPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    userName: '',
    email: '',
    phoneNumber: '',
    password: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};

    if (!formData.userName.trim()) newErrors.userName = 'Username is required';
    else if (formData.userName.length < 3) newErrors.userName = 'Username must be at least 3 characters';

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!emailRegex.test(formData.email)) newErrors.email = 'Please enter a valid email';

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';
    else if (!phoneRegex.test(formData.phoneNumber)) newErrors.phoneNumber = 'Enter valid 10-digit phone (6-9 start)';

    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';

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
      userRegister(formData).then((response)=>{
        toast.success(response.data.message)
        navigate('/login');
      })
    } catch (error:any) {
       toast.error(error.response.data.message)
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl">
        <div>
          <h2 className="text-center text-3xl font-bold text-gray-900">Create Account</h2>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {errors.general && (
            <div className="p-4 bg-red-50 border border-red-200 text-red-800 rounded-xl text-sm">
              {errors.general}
            </div>
          )}
          
          {/* Username Field */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              name="userName"
              type="text"
              value={formData.userName}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-xl border-2 transition-all ${
                errors.userName 
                  ? 'border-red-300 bg-red-50 focus:border-red-400' 
                  : 'border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-200'
              }`}
              placeholder="Enter username"
            />
            {errors.userName && (
              <p className="text-red-600 text-sm font-medium">{errors.userName}</p>
            )}
          </div>

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
                  : 'border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-200'
              }`}
              placeholder="Enter email"
            />
            {errors.email && (
              <p className="text-red-600 text-sm font-medium">{errors.email}</p>
            )}
          </div>

          {/* Phone Field */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              name="phoneNumber"
              type="tel"
              value={formData.phoneNumber}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-xl border-2 transition-all ${
                errors.phoneNumber 
                  ? 'border-red-300 bg-red-50 focus:border-red-400' 
                  : 'border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-200'
              }`}
              placeholder="Enter phone number"
            />
            {errors.phoneNumber && (
              <p className="text-red-600 text-sm font-medium">{errors.phoneNumber}</p>
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
                    : 'border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-200'
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
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl transition-all disabled:opacity-50"
          >
            {isSubmitting ? 'Creating...' : 'Create Account'}
          </button>
        </form>
        <p className="text-center text-sm">
          Already have account? <Link to="/login" className="text-blue-600 font-bold hover:underline">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
