import React, { useState } from 'react';
import { Button, Header, List, Message } from 'semantic-ui-react';

import Stream from './Stream';
import StreamModal from './StreamModal';

interface StreamsProps {
}

// no way to "list" streams?
const defaultStreamIds: string[] = [];

const Streams: React.FC<StreamsProps> = () => {
  const [selectedStreamId, setSelectedStreamId] = useState('');
  const [streamModalOpen, setStreamModalOpen] = useState(false);

  const toggleStreamModal = () => {
    setStreamModalOpen(state => !state);
  };

  return (
    <div>
      <Header as="h3">Streams</Header>

      <div style={{ textAlign: 'right' }}>
        <Button color="blue" icon="add" content="Add stream" onClick={toggleStreamModal} />
      </div>

      { defaultStreamIds.length === 0 && (
        <Message color="yellow" header="No streams" content="No streams to display." />
      )}

      <List size="big" divided>
        { defaultStreamIds.map(streamId => {
          const onClick = () => {
            setSelectedStreamId(state => state ? '' : streamId);
          };
          return (
            <List.Item key={streamId}>
              <List.Header style={{ cursor: 'pointer' }} onClick={onClick}>{ streamId }</List.Header>
              { streamId === selectedStreamId && (
                <List.Content>
                  <Stream id={streamId} />
                </List.Content>
              )}
            </List.Item>
          );
        })}
      </List>

      { streamModalOpen && (
        <StreamModal onClose={toggleStreamModal} />
      )}

    </div>
  );
};

export default Streams;
