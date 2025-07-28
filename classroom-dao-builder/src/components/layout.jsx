import React from 'react';
import { GraduationCap, Copy, Check } from 'lucide-react';

export default function Layout({
  children,
  walletConnected,
  loading,
  userAddress,
  connectWallet,
  copyAddress,
  copiedAddress,
  formatAddress
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-40 left-1/2 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Main Layout Content */}
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

              {/* Wallet Button / Info */}
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

        {/* Children components go here */}
        {children}
      </div>
    </div>
  );
}
