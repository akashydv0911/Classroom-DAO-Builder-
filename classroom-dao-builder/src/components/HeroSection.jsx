import React from 'react';

export default function HeroSection({ daos }) {
  const totalMembers = daos.reduce((acc, dao) => acc + dao.members, 0);
  const totalTokens = daos.reduce((acc, dao) => acc + dao.tokenSupply, 0);

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Democratize{' '}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Education
            </span>{' '}
            with DAOs
          </h2>
          <p className="text-xl text-gray-600 mb-12 leading-relaxed">
            Create tokenized learning communities where students and educators govern together.
            Launch your educational DAO in seconds and transform traditional classrooms into
            collaborative, decentralized learning environments.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
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
      </div>
    </section>
  );
}
// This HeroSection component displays a hero section with a title, description, and statistics about the DAOs.