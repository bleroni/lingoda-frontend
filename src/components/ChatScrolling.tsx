import React, { useState, useRef, useEffect } from 'react';
import { IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import '../styles/ChatScrolling.css';

// Define the shape of the message data
type Message = {
  text: string;
  sender: 'user' | 'bot';
};

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
  const [messages, setMessages] = useState<Message[]>([
    { text: 'Its 18:15. Do you need any other info?', sender: 'bot' },
    { text: 'Yes, what is the capital of France?', sender: 'user' },
    { text: 'Its Paris. Anything else?', sender: 'bot' },
    { text: 'Yes, what is the capital of France?', sender: 'user' },
    { text: 'Its Paris. Anything else?', sender: 'bot' },
    { text: 'Yes, what is the capital of France?', sender: 'user' },
    { text: 'Its Paris. Anything else?', sender: 'bot' },
    { text: 'Yes, what is the capital of France?', sender: 'user' },
    { text: 'Its Paris. Anything else?', sender: 'bot' },
    { text: 'Yes, what is the capital of France?', sender: 'user' },
    { text: 'Its Paris. Anything else?', sender: 'bot' },                
  ]);

  const [input, setInput] = useState('');
  const messageEndRef = useRef<HTMLDivElement | null>(null);

  // Function to handle sending a new message
  const handleSendMessage = () => {
    if (input.trim() === '') return;

    // Add new user message
    setMessages([...messages, { text: input, sender: 'user' }]);
    setInput('');

    // Simulate bot response (this could be replaced with a real API call)
    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: 'Its Paris. Anything else?', sender: 'bot' },
      ]);
    }, 500);
  };

  // Scroll to the bottom whenever new messages are added
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="chat-container">
      <div className="messages-container">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}
          >
            {message.text}
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
        />
        <SendIconButton onClick={handleSendMessage} />
      </div>
    </div>
  );
};

export default ChatScrolling;
