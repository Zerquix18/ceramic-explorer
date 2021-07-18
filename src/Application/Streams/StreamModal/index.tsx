import React, { useState } from 'react';
import { Button, Form, Modal } from 'semantic-ui-react';
import { useCeramicClient } from '../../../hooks';
import { GenesisCommit, SignedCommit } from '@ceramicnetwork/common';

interface StreamModalProps {
  onClose: () => void;
}

const StreamModal: React.FC<StreamModalProps> = ({ onClose }) => {
  const ceramicClient = useCeramicClient();
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    try {
      setLoading(true);
      const header = {
        controllers: [''], // a list of dids
      };
      let commit: GenesisCommit | SignedCommit;

      if (content.length === 0) {
        commit = { header, data: content };
      } else {
        // empty genesis commit should _always_ be signed
        commit = { ...await ceramicClient.did!.createJWS(content), header };
      }

      const result = await ceramicClient.createStreamFromGenesis(0, commit);
      console.log(result.id.toString());
      alert('Added successfully!');
    } catch (e) {
      console.log(e);
      alert(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open closeIcon size="small" onClose={onClose}>
      <Modal.Header>New Stream</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.TextArea
            label="Content"
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
          />
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button size="small" color="red" content="Close" onClick={onClose} />
        <Button size="small" color="blue" content="Submit" onClick={onSubmit} disabled={loading} />
      </Modal.Actions>
    </Modal>
  );
};

export default StreamModal;
