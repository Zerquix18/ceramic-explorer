import CeramicClient from '@ceramicnetwork/http-client';
import React, { useState } from 'react';
import { Button, Divider, Form, Grid, Label } from 'semantic-ui-react';
import CeramicClientProvider from '../providers';
import Streams from './Streams';

const Application: React.FC = () => {
  const [nodeUrl, setNodeUrl] = useState('https://gateway.ceramic.network/');
  const [loading, setLoading] = useState(false);
  const [ceramicInstance, setCeramicInstance] = useState<CeramicClient | null>(null);
  const [supportedChains, setSupportedChains] = useState<string[]>([]);

  const onValidate = async () => {
    try {
      setLoading(true);
      const ceramic = new CeramicClient(nodeUrl);
      const chains = await ceramic.getSupportedChains();
      setCeramicInstance(ceramic);
      setSupportedChains(chains);
    } catch (e) {
      console.log(e);
      alert(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Form size="large">
        <Form.Input
          disabled={!! ceramicInstance}
          size="large"
          label="Network URL"
          value={nodeUrl}
          onChange={(e) => {
            setNodeUrl(e.target.value);
          }}
        />
        <Grid columns={2}>
          <Grid.Column>
            { supportedChains.map(chain => {
              return <Label key={chain} size="small" color="blue" content={chain} />
            })}
          </Grid.Column>
          <Grid.Column textAlign="right">
            <Button color="blue" content="Validate" disabled={loading || !! ceramicInstance} onClick={onValidate} />
          </Grid.Column>
        </Grid>
      </Form>

      <Divider />

      { ceramicInstance ? (
        <CeramicClientProvider ceramicClient={ceramicInstance}>
          <Streams />
        </CeramicClientProvider>
      ) : <strong>Streams will appear here.</strong> }
    </div>
  );
};

export default Application;
