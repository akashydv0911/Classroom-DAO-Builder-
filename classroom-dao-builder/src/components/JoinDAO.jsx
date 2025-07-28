import React, { useState } from 'react';

export default function JoinDAO({ daos, joinDAO }) {
  const [selectedDaoIndex, setSelectedDaoIndex] = useState('');
  const [joining, setJoining] = useState(false);

  const handleJoin = async (e) => {
    e.preventDefault();
    if (selectedDaoIndex === '') return;

    setJoining(true);
    await joinDAO(daos[selectedDaoIndex]);
    setJoining(false);
    setSelectedDaoIndex('');
  };

  return (
    <section className="max-w-xl mx-auto mt-8 px-4 sm:px-6 lg:px-8">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">Join a DAO</h3>

      {daos.length === 0 ? (
        <p className="text-gray-500">No DAOs available to join yet. Try creating one!</p>
      ) : (
        <form
          onSubmit={handleJoin}
          className="space-y-6 bg-white/80 p-6 rounded-2xl shadow-lg border border-white/20"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700">Select DAO</label>
            <select
              value={selectedDaoIndex}
              onChange={(e) => setSelectedDaoIndex(e.target.value)}
              className="mt-1 block w-full rounded-lg border border-gray-300 p-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              required
            >
              <option value="" disabled>
                -- Choose a DAO --
              </option>
              {daos.map((dao, index) => (
                <option key={index} value={index}>
                  {dao.name} ({dao.symbol})
                </option>
              ))}
            </select>
          </div>

          <div>
            <button
              type="submit"
              disabled={joining}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {joining ? 'Joining...' : 'Join DAO'}
            </button>
          </div>
        </form>
      )}
    </section>
  );
}
// This JoinDAO component allows users to select a DAO from a dropdown and join it.