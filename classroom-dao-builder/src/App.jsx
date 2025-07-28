// File: src/App.jsx
import React from 'react';
import Layout from './components/Layout';
import HeroSection from './components/HeroSection';
import StatsSection from './components/StatsSection';
import TabNavigation from './components/TabNavigation';
import CreateDAO from './components/CreateDAO';
import JoinDAO from './components/JoinDAO';
import ExploreDAOs from './components/ExploreDAOs';
import Footer from './components/Footer';
import useDAOBuilder from './hooks/useDAOBuilder';

export default function App() {
  const daoBuilder = useDAOBuilder();

  return (
    <Layout {...daoBuilder}>
      <HeroSection {...daoBuilder} />
      <StatsSection {...daoBuilder} />
      <TabNavigation {...daoBuilder} />
      {daoBuilder.activeTab === 'create' && <CreateDAO {...daoBuilder} />}
      {daoBuilder.activeTab === 'join' && <JoinDAO {...daoBuilder} />}
      {daoBuilder.activeTab === 'explore' && <ExploreDAOs {...daoBuilder} />}
      <Footer {...daoBuilder} />
    </Layout>
  );
}