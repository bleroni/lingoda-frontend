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

interface Message {
  type: 'human' | 'ai';
  content: string;
}

interface LingodaMessageData {
  content: string;
  type: 'human' | 'ai';
}

const ChatComponent: React.FC = () => {
  // Old messages	
  const [messages, setMessages] = useState<Message[]>([
    { content: 'Its 18:15. Do you need any other info?', type: 'ai' },
    { content: 'Yes, what is the capital of France?', type: 'human' },
    { content: 'Its Paris. Anything else?', type: 'ai' },
    { content: 'Yes, what is the capital of France?', type: 'human' },
    { content: 'Its Paris. Anything else?', type: 'ai' },
    { content: 'Yes, what is the capital of France?', type: 'human' },    
    { content: 'Its Paris. Anything else?', type: 'ai' },
    { content: 'Yes, what is the capital of France?', type: 'human' },
    { content: 'Its Paris. Anything else?', type: 'ai' },
    { content: 'Yes, what is the capital of France?', type: 'human' },              
  ]);

  const { thread_id } = useParams<{ thread_id: string }>();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [input, setInput] = useState('');

  const [lingodaMessages, setLingodaMessages] = useState<LingodaMessageData[]>(messages);

  // Step 3: Always scroll to the bottom of the component
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const handleSendMessage = () => {
    alert('Sending message: ' + input);
  };  

  const handleKeyDown = () => {
    alert('handleKeyDown message: ' + input);
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

  return (
    <div style={styles.chatContainer}>
      {lingodaMessages.slice(1).map((message, index) => (
        <div
          key={`messages-${index}`}
          style={{
            ...styles.message,
            alignSelf: message.type === 'human' ? 'flex-end' : 'flex-start',
            backgroundColor: message.type === 'human' ? '#DCF8C6' : '#FFF',
          }}
        >
          <strong>{message.type === 'human' ? 'You' : 'AI'}:</strong> {message.content}
        </div>
      ))}
      <div ref={chatEndRef} />
      
      {/* Input Field */}
      <div style={styles.inputContainer}>
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
