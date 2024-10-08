// src/App.tsx
import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import Chat from './components/Chat';
import Tasks from './components/Tasks';

// Define a theme for Styled Components and Rebass
const theme = {
  colors: {
    primary: '#07c',
    secondary: '#30c',
  },
};

// Create a styled container using styled-components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f5f5f5;
`;

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <h5>Lingoda AI Assistant</h5>
        <Chat />
        <Tasks />
      </Container>
    </ThemeProvider>
  );
};

export default App;
