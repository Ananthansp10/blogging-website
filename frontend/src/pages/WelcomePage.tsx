// src/components/WelcomePage.tsx - Blogging Platform Landing Page
import React from 'react';
import { Link } from 'react-router-dom';

const WelcomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-2xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                BlogSphere
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="lg:pr-12">
            <div className="inline-flex items-center px-6 py-3 bg-white/70 backdrop-blur-md rounded-full border border-gray-200 shadow-lg mb-8">
              <svg className="w-6 h-6 text-emerald-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-lg font-semibold text-gray-700">Join 50K+ creators</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-black bg-gradient-to-r from-gray-900 via-blue-900 to-emerald-800 bg-clip-text text-transparent leading-tight mb-6">
              Write. Share. <span className="text-transparent bg-gradient-to-r from-emerald-500 to-blue-600 bg-clip-text">Inspire.</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-lg">
              Your voice matters. Share your stories, thoughts, and ideas with the world. 
              Start your blogging journey today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md">
              <Link
                to="/register"
                className="group bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-bold py-4 px-8 rounded-2xl text-lg shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center"
              >
                <svg className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
                Start Writing Free
              </Link>
              
              <Link
                to="/login"
                className="group border-2 border-gray-200 hover:border-gray-300 bg-white/80 backdrop-blur-md text-gray-800 font-bold py-4 px-8 rounded-2xl text-lg hover:bg-white shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center"
              >
                <svg className="w-6 h-6 mr-3 opacity-70 group-hover:opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                Sign In
              </Link>
            </div>

            {/* Features */}
            <div className="mt-16 grid grid-cols-3 gap-8">
              <div className="text-center p-4">
                <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.5h3m1 0v-3.5a2.5 2.5 0 012.5-2.5h3.5" />
                  </svg>
                </div>
                <p className="font-semibold text-gray-900">Rich Editor</p>
              </div>
              <div className="text-center p-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <p className="font-semibold text-gray-900">Global Reach</p>
              </div>
              <div className="text-center p-4">
                <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <p className="font-semibold text-gray-900">Free Forever</p>
              </div>
            </div>
          </div>

          {/* Right Image/Graphics */}
          <div className="relative lg:ml-20">
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-500 to-emerald-600 rounded-3xl p-12 lg:p-20 shadow-2xl transform rotate-6 hover:-rotate-1 transition-transform duration-500">
                <div className="bg-white/20 backdrop-blur-xl rounded-2xl p-8 lg:p-12 border border-white/30">
                  <div className="flex space-x-4 mb-8">
                    <div className="w-3 h-3 bg-white/50 rounded-full animate-pulse"></div>
                    <div className="w-3 h-3 bg-white/30 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                    <div className="w-3 h-3 bg-white/40 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                  </div>
                  <div className="space-y-4">
                    <div className="h-6 bg-white/30 rounded-xl animate-pulse"></div>
                    <div className="h-6 bg-white/20 rounded-xl w-3/4 animate-pulse"></div>
                    <div className="h-6 bg-white/30 rounded-xl w-5/6 animate-pulse"></div>
                    <div className="h-4 bg-white/20 rounded-lg w-1/2 animate-pulse mt-8"></div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl shadow-xl transform rotate-12 blur-xl opacity-60 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="bg-white/50 backdrop-blur-md py-20 border-t border-gray-200">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl lg:text-4xl font-black text-gray-900 mb-6">
            Ready to start your blogging journey?
          </h3>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Join thousands of writers who trust BlogSphere to share their stories with the world.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center max-w-2xl mx-auto">
            <Link
              to="/signup"
              className="group bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-bold py-4 px-12 rounded-2xl text-lg shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-300 flex items-center justify-center w-full sm:w-auto"
            >
              Get Started Free
            </Link>
            <Link
              to="/login"
              className="font-bold text-lg text-gray-800 hover:text-gray-900 transition-colors duration-200 flex items-center justify-center w-full sm:w-auto"
            >
              Or Sign In →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WelcomePage;
