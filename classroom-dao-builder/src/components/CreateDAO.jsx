import React, { useState } from 'react';

export default function CreateDAO({ createDAO }) {
  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [description, setDescription] = useState('');
  const [tokenSupply, setTokenSupply] = useState('');
  const [creating, setCreating] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !symbol || !tokenSupply) return;

    setCreating(true);
    await createDAO({ name, symbol, description, tokenSupply: Number(tokenSupply) });
    setCreating(false);
    
    // Reset form
    setName('');
    setSymbol('');
    setDescription('');
    setTokenSupply('');
  };

  return (
    <section className="max-w-2xl mx-auto mt-8 px-4 sm:px-6 lg:px-8">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">Create a New DAO</h3>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white/80 p-6 rounded-2xl shadow-lg border border-white/20">
        <div>
          <label className="block text-sm font-medium text-gray-700">DAO Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full rounded-lg border border-gray-300 p-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="e.g. LearnTogether DAO"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Symbol</label>
          <input
            type="text"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value.toUpperCase())}
            className="mt-1 block w-full rounded-lg border border-gray-300 p-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="e.g. LTD"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="mt-1 block w-full rounded-lg border border-gray-300 p-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="What's this DAO about?"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Token Supply</label>
          <input
            type="number"
            value={tokenSupply}
            onChange={(e) => setTokenSupply(e.target.value)}
            className="mt-1 block w-full rounded-lg border border-gray-300 p-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="e.g. 1000"
            required
          />
        </div>

        <div>
          <button
            type="submit"
            disabled={creating}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {creating ? 'Creating DAO...' : 'Create DAO'}
          </button>
        </div>
      </form>
    </section>
  );
}
