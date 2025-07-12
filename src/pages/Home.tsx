import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
          Swap Skills, <span className="text-accent">Grow Together</span>
        </h1>
        <p className="text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Connect with people who have the skills you need and share your expertise with others. Build meaningful relationships while learning and growing together.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/browse-skills" className="btn-primary text-xl">Start Swapping Skills</Link>
          <Link to="/how-it-works" className="btn-primary text-xl bg-transparent border border-accent text-accent hover:bg-accent hover:text-white">Learn How It Works</Link>
        </div>
      </section>

      {/* Features Section */}
      <section>
        <h2 className="text-4xl font-bold text-white text-center mb-12">Why Choose SkillLoop?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="flex flex-col items-center text-center bg-gray-900 rounded-xl p-8">
            <div className="w-16 h-16 rounded-full bg-accent text-white flex items-center justify-center text-2xl font-bold mb-4">1</div>
            <h3 className="text-xl font-bold mb-2">Offer & Request Skills</h3>
            <p className="text-gray-300">Easily post what you can teach and find people who can help you learn. From coding to cooking, anything goes!</p>
          </div>
          <div className="flex flex-col items-center text-center bg-gray-900 rounded-xl p-8">
            <div className="w-16 h-16 rounded-full bg-accent text-white flex items-center justify-center text-2xl font-bold mb-4">2</div>
            <h3 className="text-xl font-bold mb-2">Swap & Collaborate</h3>
            <p className="text-gray-300">Connect directly with other users, schedule sessions, and collaborate on projects together in real-time.</p>
          </div>
          <div className="flex flex-col items-center text-center bg-gray-900 rounded-xl p-8">
            <div className="w-16 h-16 rounded-full bg-accent text-white flex items-center justify-center text-2xl font-bold mb-4">3</div>
            <h3 className="text-xl font-bold mb-2">Ratings & Feedback</h3>
            <p className="text-gray-300">Build your reputation with honest reviews and ratings. Trust is everything in our community.</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section>
        <h2 className="text-4xl font-bold text-white text-center mb-12">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          <div className="flex flex-col items-center text-center bg-gray-900 rounded-xl p-8">
            <div className="w-16 h-16 rounded-full bg-accent text-white flex items-center justify-center text-2xl font-bold mb-4">1</div>
            <h3 className="text-lg font-bold mb-2">Create Your Profile</h3>
            <p className="text-gray-300">Sign up and tell us about your skills and what you'd like to learn.</p>
          </div>
          <div className="flex flex-col items-center text-center bg-gray-900 rounded-xl p-8">
            <div className="w-16 h-16 rounded-full bg-accent text-white flex items-center justify-center text-2xl font-bold mb-4">2</div>
            <h3 className="text-lg font-bold mb-2">Browse & Connect</h3>
            <p className="text-gray-300">Find people with the skills you need and reach out to start a conversation.</p>
          </div>
          <div className="flex flex-col items-center text-center bg-gray-900 rounded-xl p-8">
            <div className="w-16 h-16 rounded-full bg-accent text-white flex items-center justify-center text-2xl font-bold mb-4">3</div>
            <h3 className="text-lg font-bold mb-2">Schedule Sessions</h3>
            <p className="text-gray-300">Arrange skill swap sessions that work for both of you.</p>
          </div>
          <div className="flex flex-col items-center text-center bg-gray-900 rounded-xl p-8">
            <div className="w-16 h-16 rounded-full bg-accent text-white flex items-center justify-center text-2xl font-bold mb-4">4</div>
            <h3 className="text-lg font-bold mb-2">Learn & Grow</h3>
            <p className="text-gray-300">Share knowledge, build relationships, and grow your skills together.</p>
          </div>
        </div>
        <div className="text-center mt-12">
          <Link to="/how-it-works" className="btn-primary text-xl">Learn More</Link>
        </div>
      </section>

      {/* Testimonials Section */}
      <section>
        <h2 className="text-4xl font-bold text-white text-center mb-12">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-gray-900 rounded-xl p-6 flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-accent text-white flex items-center justify-center text-lg font-bold mb-4">S</div>
            <div className="text-xl font-bold text-white mb-1">Sarah Chen</div>
            <div className="text-sm text-gray-400 mb-2">Web Developer</div>
            <p className="text-gray-300 text-center">"SkillLoop helped me find a cooking mentor while I taught them web development. It's amazing how much you can learn when you share your expertise!"</p>
          </div>
          <div className="bg-gray-900 rounded-xl p-6 flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-accent text-white flex items-center justify-center text-lg font-bold mb-4">M</div>
            <div className="text-xl font-bold text-white mb-1">Mike Rodriguez</div>
            <div className="text-sm text-gray-400 mb-2">Graphic Designer</div>
            <p className="text-gray-300 text-center">"I've been using SkillLoop for 6 months now. The community is incredible and I've learned so much from people who are passionate about sharing knowledge."</p>
          </div>
          <div className="bg-gray-900 rounded-xl p-6 flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-accent text-white flex items-center justify-center text-lg font-bold mb-4">A</div>
            <div className="text-xl font-bold text-white mb-1">Alex Thompson</div>
            <div className="text-sm text-gray-400 mb-2">Marketing Specialist</div>
            <p className="text-gray-300 text-center">"The rating system gives me confidence in choosing the right people to learn from. It's like having a trusted network of experts at your fingertips."</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center">
        <h2 className="text-4xl font-bold text-white mb-4">Ready to Start Your Skill Swap Journey?</h2>
        <p className="text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">Join thousands of learners and teachers who are already swapping skills and growing together.</p>
        <Link to="/login" className="btn-primary text-xl">Get Started Today</Link>
      </section>
    </div>
  );
};

export default Home; 