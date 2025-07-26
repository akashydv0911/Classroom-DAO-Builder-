import React, { useState, useEffect } from 'react';
import { GraduationCap, Users, Plus, Coins, BookOpen, Vote, Sparkles, ChevronRight, ExternalLink, Copy, Check } from 'lucide-react';

export default function ClassroomDAOBuilder() {
  const [activeTab, setActiveTab] = useState('create');
  const [walletConnected, setWalletConnected] = useState(false);
  const [userAddress, setUserAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);
  
  // Create DAO form state
  const [createForm, setCreateForm] = useState({
    name: '',
    description: '',
    initialSupply: ''
  });
  
  // Join DAO form state
  const [joinForm, setJoinForm] = useState({
    daoCreator: '',
    stxPayment: ''
  });
  
  // Mock DAOs data
  const [daos, setDaos] = useState([
    {
      creator: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
      name: 'Advanced React Bootcamp',
      description: 'Learn React, Next.js, and modern web development with hands-on projects',
      tokenSupply: 1000,
      members: 24,
      isActive: true
    },
    {
      creator: 'ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG',
      name: 'Blockchain Fundamentals',
      description: 'Understanding Bitcoin, Ethereum, and Stacks blockchain technology',
      tokenSupply: 500,
      members: 18,
      isActive: true
    },
    {
      creator: 'ST2JHG361ZXG51QTQAVC5FLK7QGK6P1F3FQ3W5K57',
      name: 'Digital Marketing Mastery',
      description: 'SEO, social media, content marketing, and growth hacking strategies',
      tokenSupply: 750,
      members: 31,
      isActive: true
    }
  ]);

  const connectWallet = async () => {
    setLoading(true);
    // Mock wallet connection
    setTimeout(() => {
      setWalletConnected(true);
      setUserAddress('ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM');
      setLoading(false);
    }, 1500);
  };

  const createDAO = async () => {
    if (!createForm.name || !createForm.description || !createForm.initialSupply) {
      alert('Please fill in all fields');
      return;
    }
    
    setLoading(true);
    // Mock DAO creation
    setTimeout(() => {
      const newDAO = {
        creator: userAddress,
        name: createForm.name,
        description: createForm.description,
        tokenSupply: parseInt(createForm.initialSupply),
        members: 1,
        isActive: true
      };
      setDaos([newDAO, ...daos]);
      setCreateForm({ name: '', description: '', initialSupply: '' });
      setLoading(false);
      alert('DAO Created Successfully! 🎉');
    }, 2000);
  };

  const joinDAO = async () => {
    if (!joinForm.daoCreator || !joinForm.stxPayment) {
      alert('Please fill in all fields');
      return;
    }
    
    setLoading(true);
    // Mock joining DAO
    setTimeout(() => {
      const tokensReceived = Math.floor(parseInt(joinForm.stxPayment) / 1000);
      setJoinForm({ daoCreator: '', stxPayment: '' });
      setLoading(false);
      alert(`Successfully joined DAO! You received ${tokensReceived} governance tokens 🪙`);
    }, 2000);
  };

  const copyAddress = (address) => {
    navigator.clipboard.writeText(address);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  const formatAddress = (address) => {
    return `${address.slice(0, 8)}...${address.slice(-8)}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-40 left-1/2 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="backdrop-blur-sm bg-white/80 border-b border-white/20 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-2 rounded-xl">
                  <GraduationCap className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    Classroom DAO Builder
                  </h1>
                  <p className="text-sm text-gray-600">Launch educational DAOs in one click</p>
                </div>
              </div>
              
              {!walletConnected ? (
                <button
                  onClick={connectWallet}
                  disabled={loading}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Connecting...</span>
                    </div>
                  ) : (
                    'Connect Wallet'
                  )}
                </button>
              ) : (
                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    Connected
                  </div>
                  <button
                    onClick={() => copyAddress(userAddress)}
                    className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm border border-gray-200 px-4 py-2 rounded-xl hover:bg-white transition-colors"
                  >
                    <span className="text-sm font-mono">{formatAddress(userAddress)}</span>
                    {copiedAddress ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4 text-gray-400" />
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Democratize
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"> Education </span>
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
                  <div className="text-3xl font-bold text-purple-600 mb-2">{daos.reduce((acc, dao) => acc + dao.members, 0)}</div>
                  <div className="text-gray-600">Total Members</div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="text-3xl font-bold text-pink-600 mb-2">{daos.reduce((acc, dao) => acc + dao.tokenSupply, 0)}</div>
                  <div className="text-gray-600">Tokens Minted</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          {/* Tab Navigation */}
          <div className="flex justify-center mb-12">
            <div className="bg-white/80 backdrop-blur-sm p-1 rounded-2xl border border-white/20 shadow-lg">
              <div className="flex space-x-1">
                {[
                  { id: 'create', label: 'Create DAO', icon: Plus },
                  { id: 'join', label: 'Join DAO', icon: Users },
                  { id: 'explore', label: 'Explore DAOs', icon: BookOpen }
                ].map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                        activeTab === tab.id
                          ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Create DAO Tab */}
          {activeTab === 'create' && (
            <div className="max-w-2xl mx-auto">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-xl">
                <div className="text-center mb-8">
                  <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 rounded-2xl w-fit mx-auto mb-4">
                    <Sparkles className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">Create Your Educational DAO</h3>
                  <p className="text-gray-600">Launch a decentralized learning community in seconds</p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">DAO Name</label>
                    <input
                      type="text"
                      value={createForm.name}
                      onChange={(e) => setCreateForm({ ...createForm, name: e.target.value })}
                      placeholder="e.g., Advanced React Bootcamp"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white/50 backdrop-blur-sm transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                    <textarea
                      value={createForm.description}
                      onChange={(e) => setCreateForm({ ...createForm, description: e.target.value })}
                      placeholder="Describe your educational DAO and learning objectives..."
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white/50 backdrop-blur-sm transition-all resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Initial Token Supply</label>
                    <input
                      type="number"
                      value={createForm.initialSupply}
                      onChange={(e) => setCreateForm({ ...createForm, initialSupply: e.target.value })}
                      placeholder="1000"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white/50 backdrop-blur-sm transition-all"
                    />
                    <p className="text-sm text-gray-500 mt-1">Governance tokens for voting and participation</p>
                  </div>

                  <button
                    onClick={createDAO}
                    disabled={loading || !walletConnected}
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Creating DAO...</span>
                      </div>
                    ) : !walletConnected ? (
                      'Connect Wallet to Create DAO'
                    ) : (
                      'Create DAO'
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Join DAO Tab */}
          {activeTab === 'join' && (
            <div className="max-w-2xl mx-auto">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-xl">
                <div className="text-center mb-8">
                  <div className="bg-gradient-to-r from-green-500 to-blue-600 p-4 rounded-2xl w-fit mx-auto mb-4">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">Join an Educational DAO</h3>
                  <p className="text-gray-600">Become a member and receive governance tokens</p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">DAO Creator Address</label>
                    <input
                      type="text"
                      value={joinForm.daoCreator}
                      onChange={(e) => setJoinForm({ ...joinForm, daoCreator: e.target.value })}
                      placeholder="ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white/50 backdrop-blur-sm transition-all font-mono text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">STX Payment (microSTX)</label>
                    <input
                      type="number"
                      value={joinForm.stxPayment}
                      onChange={(e) => setJoinForm({ ...joinForm, stxPayment: e.target.value })}
                      placeholder="1000000"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white/50 backdrop-blur-sm transition-all"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      1 governance token = 1,000 microSTX
                      {joinForm.stxPayment && ` (${Math.floor(parseInt(joinForm.stxPayment) / 1000)} tokens)`}
                    </p>
                  </div>

                  <button
                    onClick={joinDAO}
                    disabled={loading || !walletConnected}
                    className="w-full bg-gradient-to-r from-green-500 to-blue-600 text-white py-4 rounded-xl font-semibold hover:from-green-600 hover:to-blue-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Joining DAO...</span>
                      </div>
                    ) : !walletConnected ? (
                      'Connect Wallet to Join DAO'
                    ) : (
                      'Join DAO'
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Explore DAOs Tab */}
          {activeTab === 'explore' && (
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold text-gray-900 mb-4">Explore Educational DAOs</h3>
                <p className="text-gray-600 text-lg">Discover active learning communities and join the ones that interest you</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {daos.map((dao, index) => (
                  <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
                    <div className="flex items-start justify-between mb-4">
                      <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-3 rounded-xl">
                        <BookOpen className="h-6 w-6 text-white" />
                      </div>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                        Active
                      </span>
                    </div>

                    <h4 className="text-xl font-bold text-gray-900 mb-2">{dao.name}</h4>
                    <p className="text-gray-600 mb-4 line-clamp-3">{dao.description}</p>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Creator</span>
                        <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                          {formatAddress(dao.creator)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Members</span>
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4 text-gray-400" />
                          <span className="font-semibold">{dao.members}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Token Supply</span>
                        <div className="flex items-center space-x-1">
                          <Coins className="h-4 w-4 text-gray-400" />
                          <span className="font-semibold">{dao.tokenSupply.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setJoinForm({ ...joinForm, daoCreator: dao.creator });
                        setActiveTab('join');
                      }}
                      className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center space-x-2"
                    >
                      <span>Join DAO</span>
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="bg-white/80 backdrop-blur-sm border-t border-white/20 mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-2 rounded-xl">
                  <GraduationCap className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Classroom DAO Builder
                </span>
              </div>
              <p className="text-gray-600 mb-6">Built with ❤️ for the future of decentralized education</p>
              <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
                <span>Contract: ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.classroom-dao-builder</span>
                <button className="flex items-center space-x-1 hover:text-indigo-600 transition-colors">
                  <ExternalLink className="h-4 w-4" />
                  <span>View on Explorer</span>
                </button>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}