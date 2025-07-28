import React, { useState } from 'react';
import { userSession } from '../lib/wallet';
import { openContractCall } from '@stacks/connect';
import { stringUtf8CV, PostConditionMode } from '@stacks/transactions';
import { STACKS_TESTNET } from '@stacks/network';

function CreateDAO() {
  const [daoName, setDaoName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!daoName) return alert('Please enter a DAO name');

    // Debug wallet connection
    console.log('User signed in:', userSession.isUserSignedIn());
    console.log('User data:', userSession.loadUserData());

    if (!userSession.isUserSignedIn()) {
      alert('Please connect your wallet first');
      return;
    }

    // Check if LeatherProvider exists (updated for Leather Wallet)
    console.log('Window.LeatherProvider exists:', !!window.LeatherProvider);
    console.log('Window.StacksProvider exists:', !!window.StacksProvider);
    console.log('Available providers:', window.LeatherProvider || window.StacksProvider);

    const provider = window.LeatherProvider || window.StacksProvider;
    if (!provider) {
      alert('No Stacks wallet provider found. Make sure Leather or Hiro Wallet is installed and enabled.');
      return;
    }

    const network = STACKS_TESTNET;

    const options = {
      contractAddress: 'ST1WXFZHQZ7JJE41WEKTGZMJ2Z7QKNFD7KS28DRNN',
      contractName: 'classroom-dao-builder',
      functionName: 'create-dao',
      functionArgs: [stringUtf8CV(daoName)],
      postConditionMode: PostConditionMode.Deny,
      network,
      appDetails: {
        name: 'Classroom DAO Builder',
        icon: window.location.origin + '/favicon.ico',
      },
      userSession,
      onFinish: (data) => {
        console.log('Transaction successful:', data);
        alert('DAO created successfully!');
        setDaoName('');
      },
      onCancel: () => {
        console.log('Transaction canceled');
      },
    };

    console.log("Calling openContractCall with:", options);
    
    // Try direct provider method for Leather Wallet
    try {
      console.log('About to call openContractCall...');
      
      // First try the standard approach
      let result = await openContractCall(options);
      console.log('openContractCall result:', result);
      
      // If result is undefined, try direct LeatherProvider approach
      if (result === undefined && provider && provider.transactionRequest) {
        console.log('Trying direct LeatherProvider approach...');
        
        // Wait a bit for provider to be fully ready
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Leather expects a different format
        const txOptions = {
          contractAddress: options.contractAddress,
          contractName: options.contractName,
          functionName: options.functionName,
          functionArgs: options.functionArgs.map(arg => ({
            type: arg.type,
            value: arg.value
          })),
          network: 'testnet', // Use string instead of object
          postConditions: [],
        };
        
        console.log('Leather tx options:', txOptions);
        console.log('Function args detail:', options.functionArgs);
        console.log('Provider method exists:', typeof provider.transactionRequest);
        
        try {
          console.log('Calling provider.transactionRequest...');
          result = await provider.transactionRequest(txOptions);
          console.log('Leather provider result:', result);
          
          if (result && result.txId) {
            console.log('Transaction successful, calling onFinish');
            options.onFinish(result);
          } else if (result) {
            console.log('Transaction completed but no txId:', result);
            options.onFinish(result);
          } else {
            console.log('No result returned from transaction request');
          }
        } catch (providerError) {
          console.error('Leather provider error details:', providerError);
          console.error('Error message:', providerError.message);
          console.error('Error code:', providerError.code);
          
          // Fallback: Try to trigger wallet manually
          alert('Wallet error: ' + providerError.message + '\n\nPlease check your Leather wallet for any pending transactions.');
        }
      } else if (result === undefined) {
        console.log('Provider or transactionRequest method not available');
        console.log('Provider:', provider);
        console.log('transactionRequest method:', provider?.transactionRequest);
        
        // Manual fallback
        alert('Wallet integration issue. Please:\n1. Make sure Leather wallet is unlocked\n2. Try refreshing the page\n3. Check if there are pending transactions in your wallet');
      }
      
    } catch (error) {
      console.error('Error in wallet call:', error);
      console.error('Error stack:', error.stack);
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
      alert('Wallet error: ' + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4">Create New DAO</h2>
      <input
        type="text"
        value={daoName}
        onChange={(e) => setDaoName(e.target.value)}
        placeholder="Enter DAO name"
        className="w-full p-2 border border-gray-300 rounded mb-4"
      />
      <button
        type="submit"
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
      >
        Create DAO
      </button>
    </form>
  );
}

export default CreateDAO;