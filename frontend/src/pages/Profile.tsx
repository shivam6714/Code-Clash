import React from 'react';
import { useAuth } from '../context/AuthContext';

const Profile: React.FC = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="min-h-screen bg-dark-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="bg-dark-800 shadow rounded-lg p-6 border border-dark-700 flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
          <div className="h-24 w-24 bg-dark-700 rounded-full flex items-center justify-center text-3xl font-bold text-gray-400 border-2 border-primary-500">
            {user.username.charAt(0).toUpperCase()}
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold text-white">{user.username}</h1>
            <p className="text-gray-400">{user.email}</p>
            <p className="text-sm text-gray-500 mt-1">
              Joined {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="bg-dark-800 shadow rounded-lg p-6 border border-dark-700">
          <h2 className="text-xl font-semibold text-white mb-6 border-b border-dark-700 pb-2">Statistics</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-dark-900 p-4 rounded-lg border border-dark-600 text-center">
              <p className="text-gray-400 text-sm">Rating</p>
              <p className="text-2xl font-bold text-primary-400 mt-1">{user.rating}</p>
            </div>
            <div className="bg-dark-900 p-4 rounded-lg border border-dark-600 text-center">
              <p className="text-gray-400 text-sm">Highest Rating</p>
              <p className="text-2xl font-bold text-purple-400 mt-1">{user.highestRating}</p>
            </div>
            <div className="bg-dark-900 p-4 rounded-lg border border-dark-600 text-center">
              <p className="text-gray-400 text-sm">Wins</p>
              <p className="text-2xl font-bold text-green-400 mt-1">{user.wins}</p>
            </div>
            <div className="bg-dark-900 p-4 rounded-lg border border-dark-600 text-center">
              <p className="text-gray-400 text-sm">Losses</p>
              <p className="text-2xl font-bold text-red-400 mt-1">{user.losses}</p>
            </div>
            <div className="bg-dark-900 p-4 rounded-lg border border-dark-600 text-center col-span-2 md:col-span-4">
              <p className="text-gray-400 text-sm">Draws</p>
              <p className="text-2xl font-bold text-gray-300 mt-1">{user.draws}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
