import React from 'react';

export default function Footer() {
  const contractAddress = "0x60ec2F74315Ee9f2eaA3B6D8B796C2E3E63c953A";
  const explorerUrl = `https://sepolia.etherscan.io/address/${contractAddress}`;

  return (
    <footer className="mt-20 py-10 bg-white/80 backdrop-blur-md border-t border-white/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-gray-600 text-sm mb-2">
          Built with ❤️ for decentralized classrooms.
        </p>
        <p className="text-gray-500 text-sm">
          Smart Contract:{' '}
          <a
            href={explorerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 hover:underline break-all"
          >
            {contractAddress}
          </a>
        </p>
      </div>
    </footer>
  );
}
// This Footer component displays a footer with a message and the smart contract address linked to Etherscan.