import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import SendIcon from '@mui/icons-material/Send';
import { IconButton } from '@mui/material';
import { useParams } from 'react-router-dom';

interface Props {
  onClick: () => void;
}

const SendIconButton: React.FC<Props> = ({ onClick }) => {
  return (
    <IconButton color="primary" aria-label="send" onClick={onClick}>
      <SendIcon />
    </IconButton>
  );
};

interface LingodaMessageData {
  content: string;
  type: 'human' | 'ai';
}

const ChatComponent: React.FC = () => {
  const { thread_id } = useParams<{ thread_id: string }>();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [input, setInput] = useState('');

  const [lingodaMessages, setLingodaMessages] = useState<LingodaMessageData[]>([]);

  // Step 3: Always scroll to the bottom of the component
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const handleSendMessage = async () => {
    if (input.trim() === '') return;
     // 1. Add the message to the list of messages
     setLingodaMessages([...lingodaMessages, { content: input, type: 'human' }]);

     // 2. Clear the input field  
     setInput('');

    // 3. Send the message to the AI endpoint
    try {
      setLoading(true);
      await axios.post(`${process.env.REACT_APP_API_URL}/lingoda/lingoda_agent/`, {
        thread_id,
        question: input,
      });
      
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(`Error: ${error.response?.data || error.message}`);
      } else {
        setError('An unexpected error occurred');
      }
    }

    // 4. Get updates messages from the messages endpoint
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/lingoda/all_messages/${thread_id}`);
      setLingodaMessages(response.data.messages);
    } catch (err) {
      setError("err.message");
    } finally {
      setLoading(false);
    }    
  };

  useEffect(() => {
    if (thread_id) {
      setLoading(true);
      axios
        .get(`${process.env.REACT_APP_API_URL}/lingoda/all_messages/${thread_id}`)
        .then((response) => {
          setLingodaMessages(response.data.messages);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [thread_id]);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [lingodaMessages]);

  if (error) return <div>Error: {error}</div>;

  return (
    <div style={styles.chatContainer}>
      {lingodaMessages.slice(1).map((message, index) => (
        <div
          key={`messages-${index}`}
          style={{
            ...styles.message,
            alignSelf: message.type === 'human' ? 'flex-end' : 'flex-start',
            backgroundColor: message.type === 'human' ? '#66b3ff' : '#FFF',
            color: message.type === 'human' ? '#fff' : '#000',
          }}
        >
          <strong>{message.type === 'human' ? 'You' : 'AI'}:</strong> {message.content}
        </div>
      ))}
      <div ref={chatEndRef} />
      
      {/* Input Field */}
      <div style={styles.inputContainer}>

      {loading ? 
          <p>Asking the AI Teacher...</p> 
          :
          <>      
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              style={styles.inputField}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSendMessage();
              }}
            />
            <SendIconButton onClick={handleSendMessage} />
        </>
      }
 
      </div>

    </div>
  );
};

// CSS styles for the component
const styles = {
  chatContainer: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    width: '600px',
    height: '400px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '10px',
    overflowY: 'scroll' as 'scroll',
  },
  message: {
    maxWidth: '70%',
    padding: '10px',
    borderRadius: '10px',
    margin: '5px 0',
    boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)',
  },
  inputContainer: {
    display: 'flex',
    borderTop: '1px solid #ddd',
    padding: '10px',
  },
  inputField: {
    flex: 1,
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '20px',
    marginRight: '10px',
    outline: 'none',
  },
};

export default ChatComponent;
