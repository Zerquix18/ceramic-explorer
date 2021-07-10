import React, { useState } from 'react';
import { ThreeIdConnect, EthereumAuthProvider } from '@3id/connect';
import { Button } from 'semantic-ui-react';
import CeramicClient from '@ceramicnetwork/http-client';

declare var window: any;

interface AuthenticationProps {
  ceramicClient: CeramicClient;
}

const Authentication: React.FC<AuthenticationProps> = ({ ceramicClient }) => {
  const [loading, setLoading] = useState(false);

  const onConnect = async () => {
    try {
      setLoading(true);
      const addresses = await window.ethereum.enable();
      const threeIdConnect = new ThreeIdConnect()
      const authProvider = new EthereumAuthProvider(window.ethereum, addresses[0]);
      await threeIdConnect.connect(authProvider);

      const provider = await threeIdConnect.getDidProvider()

      ceramicClient.did!.setProvider(provider);
      await ceramicClient.did!.authenticate();

      alert('All good!');
    } catch (e) {
      console.log(e);
      alert(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button
        disabled={loading}
        loading={loading}
        size="small"
        color="blue"
        icon="user"
        content="Connect using wallet"
        onClick={onConnect}
      />
    </div>
  );
};

export default Authentication;
