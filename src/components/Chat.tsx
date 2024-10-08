import React, { useState } from 'react';
import ChatContainer from './ChatContainer';
import ChatBubble from './ChatBubble';
import InputBar from './InputBar';
import '../styles/Chat.css'; // Import global styles

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { text: 'Ja, wir haben Hafermilch. Möchten Sie Ihre Milch in Ihrem Americano ersetzen?', sender: 'bot' },
    { text: 'Ja, gerne', sender: 'user' },
    { text: 'Sehr gut, ein Americano mit Hafermilch und ein Croissant. Das macht zusammen 4,50 Euro. Bitte.', sender: 'bot' },
  ]);

  const handleSendMessage = (message: string) => {
    console.log("sending message")
    // setMessages([...messages, { text: message, sender: 'user' }]);
    // // Simulate bot response (optional)
    // setTimeout(() => {
    //   setMessages((prev) => [
    //     ...prev,
    //     { text: 'Thank you! Your order will be ready shortly.', sender: 'bot' },
    //   ]);
    // }, 1000);
  };

  return (
    <ChatContainer>
      {messages.map((msg, index) => (
        <ChatBubble key={index} message={msg.text} sender={msg.sender} />
      ))}
      <InputBar onSendMessage={handleSendMessage} />
    </ChatContainer>
  );
};

export default Chat;
