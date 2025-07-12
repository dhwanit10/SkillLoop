import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const mockUsers = [
  {
    id: 1,
    name: 'Marc Demo',
    offered: ['Java Script', 'Python'],
    wanted: ['Photoshop', 'Graphic designer'],
    rating: 3.9,
    avatar: '',
  },
  {
    id: 2,
    name: 'Michell',
    offered: ['Java Script', 'Python'],
    wanted: ['Photoshop', 'Graphic designer'],
    rating: 2.5,
    avatar: '',
  },
  {
    id: 3,
    name: 'Joe wills',
    offered: ['Java Script', 'Python'],
    wanted: ['Photoshop', 'Graphic designer'],
    rating: 4.0,
    avatar: '',
  },
];

const BrowseSkills: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [availability, setAvailability] = useState('');

  const filteredUsers = mockUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.offered.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
    user.wanted.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <section className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <h1 className="text-4xl font-bold text-white">Browse Skills</h1>
        </div>
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <select className="bg-black text-white border border-gray-700 rounded-lg px-4 py-2 focus:border-accent focus:ring-accent focus:outline-none transition-all" value={availability} onChange={e => setAvailability(e.target.value)}>
            <option value="">Availability</option>
            <option value="available">Available</option>
            <option value="busy">Busy</option>
          </select>
          <input
            className="bg-black text-white border border-gray-700 rounded-lg px-4 py-2 focus:border-accent focus:ring-accent focus:outline-none transition-all w-full md:w-72"
            placeholder="Search by name or skill..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <button className="btn-primary">Search</button>
        </div>
      </section>

      {/* User Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {filteredUsers.map(user => (
          <div key={user.id} className="bg-gray-900 rounded-xl p-6 flex flex-col gap-2">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-14 h-14 rounded-full bg-accent text-white flex items-center justify-center text-lg font-bold">{user.name.charAt(0)}</div>
              <div>
                <div className="text-lg font-bold text-white">{user.name}</div>
                <div className="text-sm text-gray-400">Rating: {user.rating}/5</div>
              </div>
            </div>
            <div>
              <span className="text-accent font-semibold">Skills Offered:</span>
              {user.offered.map(skill => (
                <span key={skill} className="text-white text-sm font-medium ml-2 mb-1">{skill}</span>
              ))}
            </div>
            <div>
              <span className="text-accent font-semibold">Skill Wanted:</span>
              {user.wanted.map(skill => (
                <span key={skill} className="text-white text-sm font-medium ml-2 mb-1">{skill}</span>
              ))}
            </div>
            <div className="flex justify-end mt-2">
              <button className="btn-primary">Request</button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default BrowseSkills; 