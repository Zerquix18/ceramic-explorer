import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Container } from 'semantic-ui-react';
import Application from './Application';

const App: React.FC = () => {
  return (
    <Container style={{ paddingTop: 100 }}>
      <Application />
    </Container>
  );
};

export default App;
