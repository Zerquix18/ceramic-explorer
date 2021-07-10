import React from 'react';
import { Stream as IStream } from '@ceramicnetwork/common';
import { Divider, List } from 'semantic-ui-react';

interface StreamInfoProps {
  stream: IStream;
}

const StreamInfo: React.FC<StreamInfoProps> = ({ stream }) => {
  return (
    <div>
      <List size="medium">

        <List.Header as="h3">Basic info</List.Header>
        <List.Item>
          <List.Header as="h4">ID</List.Header>
          <List.Content>{ stream.id.toString() }</List.Content>
        </List.Item>
        <List.Item>
          <List.Header as="h4">CID</List.Header>
          <List.Content>{ stream.commitId.toString() }</List.Content>
        </List.Item>

        <Divider />

        <List.Header as="h3">Metadata</List.Header>
        <List.Item>
          <List.Header as="h4">Family</List.Header>
          <List.Content>{ stream.state.metadata.family }</List.Content>
        </List.Item>
        <List.Item>
          <List.Header as="h4">Controllers</List.Header>
          <List.Content>
            { stream.state.metadata.controllers.length === 0 && <strong> No controllers. </strong> }
            { stream.state.metadata.controllers.length > 0 && (
              <ul>
                { stream.state.metadata.controllers.map(controller => {
                  return (
                    <li key={controller}>{ controller }</li>
                  )
                })}
              </ul>
            )}
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Header as="h4">Tags</List.Header>
          <List.Content>
            { ! stream.state.metadata.tags && <strong> No tags. </strong> }
            { stream.state.metadata.tags && (
              <ul>
                { stream.state.metadata.tags.map(tag => {
                  return (
                    <li key={tag}>{ tag }</li>
                  )
                })}
              </ul>
            )}
          </List.Content>
        </List.Item>

        <Divider />

      </List>
    </div>
  );
};

export default StreamInfo;
