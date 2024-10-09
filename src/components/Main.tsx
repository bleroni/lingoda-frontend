import { useState }  from 'react'
import { Flex } from 'rebass';
import ChatComponent from './ChatComponent';
import ScenarioCard from './Scenario';
import styled, { ThemeProvider } from 'styled-components';
import StartNewConversationButton from './StartNewConversationButton';
import Tasks from './Tasks';
import { TasksType } from '../types';
import { initialTasks } from '../common';

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
  const [tasks, setTasks] = useState<TasksType>(initialTasks);

  return (    
    <ThemeProvider theme={theme}>
      <Container>

        <StartNewConversationButton /> 
        <h2 style={{ marginBottom: '20px'}}>Lingoda AI Assistant</h2>
        <Flex flexDirection={'row'}>
          <Flex flexDirection={'column'}>
            <ChatComponent tasks={tasks} setTasks={setTasks} />
          </Flex>

          <Flex flexDirection={'column'} ml={'20px'} sx={{ width: '200px'}}>
            <ScenarioCard title="Scenario" description="You are at the doctor's. You have a heachache and a sore throat, but no cough. The doctor asks how you are. The doctor is called Dr. Pearson." />
            <Tasks 
              tasks={tasks} 
            />           
          </Flex>
        </Flex>

      </Container>
    </ThemeProvider>
  );
};

export default Main;