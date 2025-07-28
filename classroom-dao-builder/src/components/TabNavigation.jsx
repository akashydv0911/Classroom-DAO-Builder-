import React from 'react';
import { PlusCircle, Users, Compass } from 'lucide-react';

export default function TabNavigation({ activeTab, setActiveTab }) {
  const tabs = [
    { key: 'create', label: 'Create DAO', icon: <PlusCircle className="w-5 h-5" /> },
    { key: 'join', label: 'Join DAO', icon: <Users className="w-5 h-5" /> },
    { key: 'explore', label: 'Explore DAOs', icon: <Compass className="w-5 h-5" /> },
  ];

  return (
    <nav className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-8">
      <div className="flex justify-center space-x-4 bg-white/80 backdrop-blur-md border border-white/20 rounded-2xl shadow-md p-2">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200
              ${activeTab === tab.key
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-100'
              }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
