import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import SendIcon from '@mui/icons-material/Send';
import { IconButton } from '@mui/material';
import { useParams } from 'react-router-dom';
import '../styles/ChatScrolling.css';

// Define the shape of the message data
type Message = {
  content: string;
  type: 'human' | 'ai';
};

interface LingodaMessageData {
  content: string;
  type: string;
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

  const [messages, setMessages] = useState<Message[]>([
    { content: 'Its 18:15. Do you need any other info?', type: 'ai' },
    { content: 'Yes, what is the capital of France?', type: 'human' },
    { content: 'Its Paris. Anything else?', type: 'ai' },
    { content: 'Yes, what is the capital of France?', type: 'human' },
    { content: 'Its Paris. Anything else?', type: 'ai' },
    { content: 'Yes, what is the capital of France?', type: 'human' },             
  ]);

  const [input, setInput] = useState('');
  const messageEndRef = useRef<HTMLDivElement | null>(null);

  // Function to handle sending a new message
  const handleSendMessage = () => {
    if (input.trim() === '') return;

    // Add new user message
    setMessages([...messages, { content: input, type: 'human' }]);
    setInput('');

  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      setMessages([...messages, { content: input, type: 'human' }]);
      setInput('');
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
  }, [messages, thread_id]);

  return (
    <div className="chat-container">
      <div className="messages-container">
        {lingodaMessages.slice(1).map((message, index) => (
          <div
            key={index}
            className={`message ${message.type === 'human' ? 'user-message' : 'bot-message'}`}
          >
            {message.content}
          </div>
        ))}
        <div ref={messageEndRef} />
      </div>
      <div className="input-container">
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
