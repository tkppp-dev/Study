import React from 'react';
import { StatusBar } from 'react-native';
import styled from 'styled-components/native';
import Form from './components/Form';

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #fff;
  justify-content: center;
  align-items: center;
`;

const App = () => {
  return (
    <Container>
      <StatusBar />
      <Form />
    </Container>
  );
};

export default App;
