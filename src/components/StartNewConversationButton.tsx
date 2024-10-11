import React, { useState } from 'react';
import { Button, Box } from '@mui/material';

const StartNewConversationButton: React.FC = () => {
  const [url, setUrl] = useState<string | null>(null);

  // Function to generate a random URL
  const generateRandomUrl = () => {
    const randomString = Math.random().toString(36).substring(2, 15);
    const randomUrl = `/chat/${randomString}`;
    setUrl(randomUrl);
    window.location.href = randomUrl;
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
      {/* Button that generates the URL */}
      <Button variant="contained" color="primary" onClick={generateRandomUrl}>
        Start a new conversation
      </Button>
      <p>{url}</p>
    </Box>
  );
};

export default StartNewConversationButton;
