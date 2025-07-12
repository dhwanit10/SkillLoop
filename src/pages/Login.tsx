import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-xl p-8 max-w-md w-full mx-auto shadow-lg">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-accent text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">S</div>
          <h2 className="text-4xl font-bold text-white mb-2">{isLogin ? 'Welcome Back' : 'Join SkillLoop'}</h2>
          <p className="text-lg text-gray-300 mb-2">
            {isLogin 
              ? 'Sign in to your account to continue learning and teaching'
              : 'Create your account and start your skill swap journey'
            }
          </p>
        </div>
        <div className="flex bg-black rounded-lg p-1 mb-6 gap-2">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-2 px-4 rounded-lg text-lg font-semibold transition-colors ${isLogin ? 'bg-accent text-white' : 'bg-black text-gray-400 hover:text-white'}`}
          >
            Sign In
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-2 px-4 rounded-lg text-lg font-semibold transition-colors ${!isLogin ? 'bg-accent text-white' : 'bg-black text-gray-400 hover:text-white'}`}
          >
            Sign Up
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <div>
              <label htmlFor="name" className="block text-lg text-gray-300 mb-2 font-semibold">Full Name</label>
              <input
                id="name"
                name="name"
                type="text"
                required={!isLogin}
                value={formData.name}
                onChange={handleInputChange}
                className="bg-black text-white border border-gray-700 rounded-lg px-4 py-2 focus:border-accent focus:ring-accent focus:outline-none transition-all w-full"
                placeholder="Enter your full name"
              />
            </div>
          )}
          <div>
            <label htmlFor="email" className="block text-lg text-gray-300 mb-2 font-semibold">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              className="bg-black text-white border border-gray-700 rounded-lg px-4 py-2 focus:border-accent focus:ring-accent focus:outline-none transition-all w-full"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-lg text-gray-300 mb-2 font-semibold">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleInputChange}
              className="bg-black text-white border border-gray-700 rounded-lg px-4 py-2 focus:border-accent focus:ring-accent focus:outline-none transition-all w-full"
              placeholder="Enter your password"
            />
          </div>
          {!isLogin && (
            <div>
              <label htmlFor="confirmPassword" className="block text-lg text-gray-300 mb-2 font-semibold">Confirm Password</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required={!isLogin}
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="bg-black text-white border border-gray-700 rounded-lg px-4 py-2 focus:border-accent focus:ring-accent focus:outline-none transition-all w-full"
                placeholder="Confirm your password"
              />
            </div>
          )}
          <button type="submit" className="btn-primary w-full text-xl">{isLogin ? 'Sign In' : 'Create Account'}</button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-base text-gray-400">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-accent hover:underline font-semibold"
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400">
            By continuing, you agree to our{' '}
            <a href="#" className="text-accent hover:underline font-semibold">Terms of Service</a>
            {' '}and{' '}
            <a href="#" className="text-accent hover:underline font-semibold">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login; 