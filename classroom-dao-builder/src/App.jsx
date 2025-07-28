import React, { useEffect, useState } from 'react';
import { authenticate, getUserData, disconnect } from './lib/wallet';
import Layout from './components/Layout';
import TabNavigation from './components/TabNavigation';
import CreateDAO from './components/CreateDAO';
import JoinDAO from './components/JoinDAO';
import ExploreDAOs from './components/ExploreDAOs';
import Footer from './components/Footer';
import useDAOBuilder from './hooks/useDAOBuilder';

function App() {
  const { daos, activeTab, setActiveTab, createDAO, joinDAO } = useDAOBuilder();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const data = getUserData();
    setUserData(data);
  }, []);

  return (
    <Layout>
      <div className="text-right max-w-6xl mx-auto pt-4 px-4">
        {userData ? (
          <div className="flex items-center justify-end gap-4">
            <span className="text-sm text-gray-700">
              Connected: {userData.profile.stxAddress.testnet || userData.profile.stxAddress.mainnet}
            </span>
            <button
              onClick={disconnect}
              className="bg-red-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-red-700"
            >
              Disconnect
            </button>
          </div>
        ) : (
          <button
            onClick={authenticate}
            className="bg-indigo-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-indigo-700"
          >
            Connect Leather Wallet
          </button>
        )}
      </div>

      <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === 'create' && <CreateDAO createDAO={createDAO} />}
      {activeTab === 'join' && <JoinDAO daos={daos} joinDAO={joinDAO} />}
      {activeTab === 'explore' && <ExploreDAOs daos={daos} />}

      <Footer />
    </Layout>
  );
}

export default App;
