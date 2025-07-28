import { useState, useEffect } from 'react';

export default function useDAOBuilder() {
  const [daos, setDaos] = useState([]);
  const [activeTab, setActiveTab] = useState('create');

  // Load from localStorage on mount
  useEffect(() => {
    const storedDaos = localStorage.getItem('daos');
    if (storedDaos) {
      setDaos(JSON.parse(storedDaos));
    }
  }, []);

  // Save to localStorage whenever daos change
  useEffect(() => {
    localStorage.setItem('daos', JSON.stringify(daos));
  }, [daos]);

  const createDAO = ({ name, symbol, description, tokenSupply }) => {
    const newDAO = {
      name,
      symbol,
      description,
      tokenSupply,
      members: 1, // creator is the first member
    };
    setDaos((prev) => [...prev, newDAO]);
  };

  const joinDAO = (daoToJoin) => {
    const updatedDaos = daos.map((dao) => {
      if (dao.name === daoToJoin.name && dao.symbol === daoToJoin.symbol) {
        return { ...dao, members: dao.members + 1 };
      }
      return dao;
    });
    setDaos(updatedDaos);
  };

  return {
    daos,
    activeTab,
    setActiveTab,
    createDAO,
    joinDAO,
  };
}
// This hook manages the state and logic for the DAO Builder application, including creating and joining DAOs, and persisting data in localStorage.