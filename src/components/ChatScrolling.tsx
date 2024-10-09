import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import SendIcon from '@mui/icons-material/Send';
import { IconButton } from '@mui/material';
import { useParams } from 'react-router-dom';
import '../styles/ChatScrolling.css';

interface LingodaMessageData {
  content: string;
  type: 'human' | 'ai';
}

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

// Chat component
const ChatScrolling: React.FC = () => {
  const { thread_id } = useParams<{ thread_id: string }>();

  
  const [lingodaMessages, setLingodaMessages] = useState<LingodaMessageData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [input, setInput] = useState('');
  const messageEndRef = useRef<HTMLDivElement | null>(null);

  // Function to handle sending a new message
  const handleSendMessage = async () => {
    if (input.trim() === '') return;

     // 1. Clear the input field  
     setInput('');

    // 2. Send the message to the AI endpoint
    try {
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

    // 3. Get updates messages from the messages endpoint
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/lingoda/all_messages/${thread_id}`);
      console.log(response.data);
      setLingodaMessages(response.data.messages);
    } catch (err) {
      setError("err.message");
    } finally {
      setLoading(false);
    }    
  };

  const handleKeyDown = async (event: React.KeyboardEvent) => {
    if (input.trim() === '') return;

    if (event.key === 'Enter') {

        // 1. Clear the input field  
        setInput('');

        // 2. Send the message to the AI endpoint
        try {
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

        // 3. Get updates messages from the messages endpoint
        try {
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/lingoda/all_messages/${thread_id}`);
          console.log(response.data);
          setLingodaMessages(response.data.messages);
        } catch (err) {
          setError("err.message");
        } finally {
          setLoading(false);
        }    
    }
  };

  // Scroll to the bottom whenever new messages are added
  useEffect(() => {
    // Get messages for thread_id
    if (thread_id) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/lingoda/all_messages/${thread_id}`)
        .then((response) => {
          console.log(response.data);
          setLingodaMessages(response.data.messages);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }
    // Scroll into view
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [thread_id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="chat-container">
      <div className="messages-container">
        {lingodaMessages && lingodaMessages.slice(1).map((message, index) => (
          <div
            key={index}
            className={`message ${message.type === 'human' ? 'user-message' : 'bot-message'}`}
          >
            {message.content}
          </div>
        ))}
        
      </div>
      <div className="input-container">
        <div ref={messageEndRef} />
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="message-input"
          onKeyDown={handleKeyDown}
        />
        <SendIconButton onClick={handleSendMessage} />
      </div>
      {/* <p>{JSON.stringify(lingodaMessages)}</p> */}
    </div>
  );
};

export default ChatScrolling;
