import React from 'react';

export default function StatsSection({ daos }) {
  const totalMembers = daos.reduce((acc, dao) => acc + dao.members, 0);
  const totalTokens = daos.reduce((acc, dao) => acc + dao.tokenSupply, 0);

  return (
    <section className="pb-16 -mt-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-3xl font-bold text-indigo-600 mb-2">{daos.length}</div>
            <div className="text-gray-600">Active DAOs</div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-3xl font-bold text-purple-600 mb-2">{totalMembers}</div>
            <div className="text-gray-600">Total Members</div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-3xl font-bold text-pink-600 mb-2">{totalTokens}</div>
            <div className="text-gray-600">Tokens Minted</div>
          </div>
        </div>
      </div>
    </section>
  );
}
// This StatsSection component displays statistics about the DAOs, including the number of active DAOs, total members, and tokens minted.