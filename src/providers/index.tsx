import React from 'react';
import CeramicClient from '@ceramicnetwork/http-client';

export const CeramicClientContext = React.createContext<CeramicClient | null>(null);

interface CeramicClientProviderProps {
  ceramicClient: CeramicClient;
  children: React.ReactNode;
}

export const CeramicClientProvider: React.FC<CeramicClientProviderProps> = ({ ceramicClient, children }) => {
  return (
    <CeramicClientContext.Provider value={ceramicClient}>
      { children }
    </CeramicClientContext.Provider>
  );
};

export default CeramicClientProvider;
