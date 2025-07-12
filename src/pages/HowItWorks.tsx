import React from 'react';
import { Link } from 'react-router-dom';

const HowItWorks: React.FC = () => {
  return (
    <div className="min-h-screen bg-black">
      {/* Header Section */}
      <section className="text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">How SkillLoop Works</h1>
        <p className="text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">Our platform makes skill sharing simple and rewarding. Here's everything you need to know to get started.</p>
        <Link to="/login" className="btn-primary text-xl">Get Started Now</Link>
      </section>

      {/* Steps Section */}
      <section>
        <h2 className="text-4xl font-bold text-white text-center mb-12">Get started in just 4 simple steps</h2>
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
      </section>

      {/* Tips Section */}
      <section>
        <h2 className="text-4xl font-bold text-white text-center mb-12">Pro Tips for Success</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          <div className="flex flex-col items-center text-center bg-gray-900 rounded-xl p-8">
            <div className="w-12 h-12 rounded-full bg-accent text-white flex items-center justify-center text-lg font-bold mb-4">💡</div>
            <h3 className="text-lg font-bold mb-2">Be Specific</h3>
            <p className="text-gray-300">Instead of "I can teach programming," try "I can teach React.js for beginners" or "I can help with Python data analysis projects."</p>
          </div>
          <div className="flex flex-col items-center text-center bg-gray-900 rounded-xl p-8">
            <div className="w-12 h-12 rounded-full bg-accent text-white flex items-center justify-center text-lg font-bold mb-4">🎯</div>
            <h3 className="text-lg font-bold mb-2">Set Clear Expectations</h3>
            <p className="text-gray-300">Discuss what you want to learn or teach, your experience level, and how much time you can commit before starting sessions.</p>
          </div>
          <div className="flex flex-col items-center text-center bg-gray-900 rounded-xl p-8">
            <div className="w-12 h-12 rounded-full bg-accent text-white flex items-center justify-center text-lg font-bold mb-4">⏳</div>
            <h3 className="text-lg font-bold mb-2">Be Patient</h3>
            <p className="text-gray-300">Learning takes time. Be patient with yourself and your learning partner. Celebrate small wins and progress.</p>
          </div>
          <div className="flex flex-col items-center text-center bg-gray-900 rounded-xl p-8">
            <div className="w-12 h-12 rounded-full bg-accent text-white flex items-center justify-center text-lg font-bold mb-4">🤝</div>
            <h3 className="text-lg font-bold mb-2">Give Back</h3>
            <p className="text-gray-300">Leave honest reviews and ratings after sessions. This helps build trust and improves the experience for everyone.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center">
        <h2 className="text-4xl font-bold text-white mb-4">Ready to Start Learning?</h2>
        <p className="text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">Join our community today and start your skill swap journey.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/login" className="btn-primary text-xl">Create Your Profile</Link>
          <Link to="/browse-skills" className="btn-primary text-xl bg-transparent border border-accent text-accent hover:bg-accent hover:text-white">Browse Skills</Link>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks; 