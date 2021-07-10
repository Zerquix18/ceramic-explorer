import React, { useState } from 'react';
import { Header, List } from 'semantic-ui-react';
import Stream from './Stream';

interface StreamsProps {
}

// no way to "list" streams?
const defaultStreamIds = ['k2t6wyfsu4pg24335djuw5lkqkqwsz2eec85tb6p0lovq6juwv7h3f4f2x2oa3'];

const Streams: React.FC<StreamsProps> = () => {
  const [selectedStreamId, setSelectedStreamId] = useState('');

  return (
    <div>
      <Header as="h3">Streams</Header>

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
    </div>
  );
};

export default Streams;
