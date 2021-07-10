import React from 'react';
import { Stream as IStream } from '@ceramicnetwork/common';
import { useCeramicClient } from '../../../../hooks';
import { Button } from 'semantic-ui-react';

interface StreamWriteProps {
  stream: IStream;
}

const StreamWrite: React.FC<StreamWriteProps> = ({ stream }) => {
  const ceramicClient = useCeramicClient();

  const onSubmit = async () => {
    try {
      await ceramicClient.applyCommit(stream.id, '??', {})
    } catch (e) {
      alert(e.message);
      console.log(e);
    }
  };

  return (
    <div>
      <Button color="blue" content="click me" onClick={onSubmit} />
    </div>
  );
};

export default StreamWrite;
