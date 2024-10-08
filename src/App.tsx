// src/App.tsx
import React from 'react';
import { Flex } from 'rebass';
import styled, { ThemeProvider } from 'styled-components';
import Tasks from './components/Tasks';
import ScenarioCard from './components/Scenario';
import ChatScrolling from './components/ChatScrolling';

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
  overflow-y: scroll;
`;

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Flex flexDirection={'row'}>
          <Flex flexDirection={'column'}>
            <ChatScrolling />
          </Flex>

          <Flex flexDirection={'column'} ml={'20px'}>
            <ScenarioCard title="Scenario" description="You walked into a coffee shop in Berlin, stood in line to order and now it's your turn. The barista greets you." />
            <Tasks />
          </Flex>

        </Flex>
      </Container>
    </ThemeProvider>
  );
};

export default App;
