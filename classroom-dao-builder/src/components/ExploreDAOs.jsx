import React from 'react';

export default function ExploreDAOs({ daos }) {
  return (
    <section className="max-w-6xl mx-auto mt-8 px-4 sm:px-6 lg:px-8">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">Explore DAOs</h3>

      {daos.length === 0 ? (
        <p className="text-gray-500">No DAOs found. Be the first to create one!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {daos.map((dao, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-md border border-white/20 rounded-2xl shadow-md p-6 hover:shadow-xl transition-shadow"
            >
              <h4 className="text-xl font-semibold text-gray-800 mb-2">{dao.name}</h4>
              <p className="text-sm text-gray-600 mb-4">{dao.description || 'No description provided.'}</p>

              <div className="text-sm text-gray-500">
                <div><strong>Symbol:</strong> {dao.symbol}</div>
                <div><strong>Members:</strong> {dao.members}</div>
                <div><strong>Token Supply:</strong> {dao.tokenSupply}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
