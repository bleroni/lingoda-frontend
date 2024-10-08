import React, { useState } from 'react';
import '../styles/InputBar.css'; // Import styles

interface InputBarProps {
  onSendMessage: (message: string) => void;
}

const InputBar: React.FC<InputBarProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    alert("Sending message...");
    if (message.trim()) {
      onSendMessage(message);
      setMessage(''); // Clear the input field after sending
    }
  };

  return (
    <div className="input-bar">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Send a message..."
        className="input-field"
      />
      <button onClick={handleSendMessage} className="send-button">
        Send
      </button>
    </div>
  );
};

export default InputBar;
