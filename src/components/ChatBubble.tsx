import React from 'react';
import '../styles/ChatBubble.css'; // Import styles

interface ChatBubbleProps {
  message: string;
  sender: 'user' | 'bot';
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message, sender }) => {
  return (
    <div className={`chat-bubble ${sender}`}>
      <div className="bubble-text">{message}</div>
    </div>
  );
};

export default ChatBubble;
