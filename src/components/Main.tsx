import { Flex } from 'rebass';
import styled, { ThemeProvider } from 'styled-components';
import ChatScrolling from './ChatScrolling';
import StartNewConversationButton from './StartNewConversationButton';
import ScenarioCard from './Scenario';
import Tasks from './Tasks';
import ChatComponent from './ChatComponent';

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

const Main: React.FC = () => {
  return (    
    <ThemeProvider theme={theme}>
      <Container>
        <StartNewConversationButton /> 
        <h2 style={{ marginBottom: '20px'}}>Lingoda AI Assistant</h2>
        <Flex flexDirection={'row'}>
          <Flex flexDirection={'column'}>
            {/* <ChatScrolling /> */}
            <ChatComponent />
          </Flex>

          <Flex flexDirection={'column'} ml={'20px'} sx={{ width: '200px'}}>
            <ScenarioCard title="Scenario" description="You walked into a coffee shop in Berlin, stood in line to order and now it's your turn. The barista greets you." />
            <Tasks />           
          </Flex>
        </Flex>     
      </Container>
    </ThemeProvider>
  );
};

export default Main;