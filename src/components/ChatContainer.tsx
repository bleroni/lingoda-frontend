import React from 'react';
import '../styles/ChatContainer.css'; // Import styles

interface ChatContainerProps {
  children: React.ReactNode;
}

const ChatContainer: React.FC<ChatContainerProps> = ({ children }) => {
  return <div className="chat-container">{children}</div>;
};

export default ChatContainer;
