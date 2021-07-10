import React, { useCallback, useEffect, useState } from 'react';
import { Stream as IStream } from '@ceramicnetwork/common';
import { Divider, Tab } from 'semantic-ui-react';
import StreamInfo from './StreamInfo';
import StreamWrite from './StreamWrite';
import { useCeramicClient } from '../../../hooks';

interface StreamProps {
  id: string;
}

const Stream: React.FC<StreamProps> = ({ id }) => {
  const ceramicClient = useCeramicClient();

  const [stream, setStream] = useState<IStream | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchStream = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const stream = await ceramicClient.loadStream(id);
      setStream(stream);
    } catch (e) {
      console.log(e);
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [ceramicClient, id]);

  useEffect(() => {
    fetchStream();
  }, [fetchStream]);

  if (loading) {
    return <strong>Loading...</strong>;
  }

  if (error) {
    return <strong>Error: { error }</strong>;
  }

  if (! stream) {
    return <strong>Something went wrong.</strong>;
  }

  const panes = [
    { menuItem: 'Info', render: () => <Tab.Pane><StreamInfo stream={stream} /></Tab.Pane> },
    { menuItem: 'Write', render: () => <Tab.Pane><StreamWrite stream={stream} /></Tab.Pane> },
  ];
  
  return (
    <div>
      <Divider />
      <Tab panes={panes} />
    </div>
  );
};

export default Stream;
