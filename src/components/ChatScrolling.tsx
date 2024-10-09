import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import SendIcon from '@mui/icons-material/Send';
import { IconButton } from '@mui/material';
import { useParams } from 'react-router-dom';
import '../styles/ChatScrolling.css';

interface LingodaMessageData {
  content: string;
  type: string;
}

interface Props {
  onClick: () => void;
}

const initialMessages = [
  {
  "content": "\n        You are an AI Simulated Doctor. In a controlled environment, another AI agent is acting as a patient.\n        Make sure to ask the patient about their cough, before diagnosing them.\n        Do not suggest any medicine or prescription, unless the patient asks for it specifically.\n        If they ask for medicine or prescription, suggest paracetomol, rest and to drink lots of water.\n        Never suggest consulting a healthcare professional.\n        Your name is Dr. Pearson.\n    ",
  "additional_kwargs": {},
  "response_metadata": {},
  "type": "system",
  "name": null,
  "id": "ba5ca041-c34a-458a-955d-a440d18ea1fe"
  },
  {
  "content": "How are you today?",
  "additional_kwargs": {},
  "response_metadata": {},
  "type": "ai",
  "name": null,
  "id": "66689f17-22cc-4b90-bb65-41e625dc943e",
  "example": false,
  "tool_calls": [],
  "invalid_tool_calls": [],
  "usage_metadata": null
  },
  {
  "content": "good, and you?",
  "additional_kwargs": {},
  "response_metadata": {},
  "type": "human",
  "name": null,
  "id": "edf63dd6-ca82-41d1-8663-f187745cf22b",
  "example": false
  },
  {
  "content": "I'm here and ready to help! What brings you in today?",
  "additional_kwargs": {},
  "response_metadata": {
  "token_usage": {
  "completion_tokens": 13,
  "prompt_tokens": 121,
  "total_tokens": 134,
  "prompt_tokens_details": {
  "cached_tokens": 0
  },
  "completion_tokens_details": {
  "reasoning_tokens": 0
  }
  },
  "model_name": "gpt-4o-2024-08-06",
  "system_fingerprint": "fp_6b68a8204b",
  "finish_reason": "stop",
  "logprobs": null
  },
  "type": "ai",
  "name": null,
  "id": "run-f2eef33a-3d53-420e-8a28-d364070d504d-0",
  "example": false,
  "tool_calls": [],
  "invalid_tool_calls": [],
  "usage_metadata": {
  "input_tokens": 121,
  "output_tokens": 13,
  "total_tokens": 134
  }
  },
  {
  "content": "what is your name?",
  "additional_kwargs": {},
  "response_metadata": {},
  "type": "human",
  "name": null,
  "id": "dd0e4d08-3750-4827-8146-ce69950e1c96",
  "example": false
  },
  {
  "content": "My name is Dr. Pearson. How can I assist you today?",
  "additional_kwargs": {},
  "response_metadata": {
  "token_usage": {
  "completion_tokens": 14,
  "prompt_tokens": 147,
  "total_tokens": 161,
  "prompt_tokens_details": {
  "cached_tokens": 0
  },
  "completion_tokens_details": {
  "reasoning_tokens": 0
  }
  },
  "model_name": "gpt-4o-2024-08-06",
  "system_fingerprint": "fp_6b68a8204b",
  "finish_reason": "stop",
  "logprobs": null
  },
  "type": "ai",
  "name": null,
  "id": "run-dbb68167-2c34-436a-9de3-a3ed06d0f097-0",
  "example": false,
  "tool_calls": [],
  "invalid_tool_calls": [],
  "usage_metadata": {
  "input_tokens": 147,
  "output_tokens": 14,
  "total_tokens": 161
  }
  },
  {
  "content": "i am not feeling good",
  "additional_kwargs": {},
  "response_metadata": {},
  "type": "human",
  "name": null,
  "id": "0baa1109-f1d2-454e-97f0-6123b8537320",
  "example": false
  },
  {
  "content": "I'm sorry to hear that. Can you tell me more about your symptoms? Are you experiencing a cough?",
  "additional_kwargs": {},
  "response_metadata": {
  "token_usage": {
  "completion_tokens": 21,
  "prompt_tokens": 174,
  "total_tokens": 195,
  "prompt_tokens_details": {
  "cached_tokens": 0
  },
  "completion_tokens_details": {
  "reasoning_tokens": 0
  }
  },
  "model_name": "gpt-4o-2024-08-06",
  "system_fingerprint": "fp_6b68a8204b",
  "finish_reason": "stop",
  "logprobs": null
  },
  "type": "ai",
  "name": null,
  "id": "run-9d0f1693-3d52-4d25-b0c9-4858f47f4edd-0",
  "example": false,
  "tool_calls": [],
  "invalid_tool_calls": [],
  "usage_metadata": {
  "input_tokens": 174,
  "output_tokens": 21,
  "total_tokens": 195
  }
  },
  {
  "content": "no, I'm not",
  "additional_kwargs": {},
  "response_metadata": {},
  "type": "human",
  "name": null,
  "id": "3b882d98-4fc8-47a8-981b-ad56fae0d7c8",
  "example": false
  },
  {
  "content": "Alright, thank you for letting me know. Could you describe the symptoms you're experiencing?",
  "additional_kwargs": {},
  "response_metadata": {
  "token_usage": {
  "completion_tokens": 17,
  "prompt_tokens": 207,
  "total_tokens": 224,
  "prompt_tokens_details": {
  "cached_tokens": 0
  },
  "completion_tokens_details": {
  "reasoning_tokens": 0
  }
  },
  "model_name": "gpt-4o-2024-08-06",
  "system_fingerprint": "fp_6b68a8204b",
  "finish_reason": "stop",
  "logprobs": null
  },
  "type": "ai",
  "name": null,
  "id": "run-10979dd3-0bf8-48fd-ba24-90815f4da9b5-0",
  "example": false,
  "tool_calls": [],
  "invalid_tool_calls": [],
  "usage_metadata": {
  "input_tokens": 207,
  "output_tokens": 17,
  "total_tokens": 224
  }
  },
  {
  "content": "i have a headache",
  "additional_kwargs": {},
  "response_metadata": {},
  "type": "human",
  "name": null,
  "id": "78fd2706-8a19-463c-b56c-5d30d161c530",
  "example": false
  },
  {
  "content": "I'm sorry to hear about your headache. How long have you been experiencing it, and is there anything that seems to make it better or worse?",
  "additional_kwargs": {},
  "response_metadata": {
  "token_usage": {
  "completion_tokens": 29,
  "prompt_tokens": 236,
  "total_tokens": 265,
  "prompt_tokens_details": {
  "cached_tokens": 0
  },
  "completion_tokens_details": {
  "reasoning_tokens": 0
  }
  },
  "model_name": "gpt-4o-2024-08-06",
  "system_fingerprint": "fp_6b68a8204b",
  "finish_reason": "stop",
  "logprobs": null
  },
  "type": "ai",
  "name": null,
  "id": "run-470fe9d5-9c09-449a-991c-b7181e2244f4-0",
  "example": false,
  "tool_calls": [],
  "invalid_tool_calls": [],
  "usage_metadata": {
  "input_tokens": 236,
  "output_tokens": 29,
  "total_tokens": 265
  }
  },
  {
  "content": "how many days in october?",
  "additional_kwargs": {},
  "response_metadata": {},
  "type": "human",
  "name": null,
  "id": "4ff59977-6304-4ee1-91de-9083db7d183d",
  "example": false
  },
  {
  "content": "October has 31 days. Is there anything else you'd like to discuss about your symptoms?",
  "additional_kwargs": {},
  "response_metadata": {
  "token_usage": {
  "completion_tokens": 18,
  "prompt_tokens": 279,
  "total_tokens": 297,
  "prompt_tokens_details": {
  "cached_tokens": 0
  },
  "completion_tokens_details": {
  "reasoning_tokens": 0
  }
  },
  "model_name": "gpt-4o-2024-08-06",
  "system_fingerprint": "fp_6b68a8204b",
  "finish_reason": "stop",
  "logprobs": null
  },
  "type": "ai",
  "name": null,
  "id": "run-50fd2725-bd8f-4df6-8356-c8c676b4e2c8-0",
  "example": false,
  "tool_calls": [],
  "invalid_tool_calls": [],
  "usage_metadata": {
  "input_tokens": 279,
  "output_tokens": 18,
  "total_tokens": 297
  }
  }
  ]

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
  const newArray = initialMessages.map(({ type, content }) => ({ type, content }));

  
  const [lingodaMessages, setLingodaMessages] = useState<LingodaMessageData[]>(newArray);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [input, setInput] = useState('');
  const messageEndRef = useRef<HTMLDivElement>(null);


  
  // Function to handle sending a new message
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

  const handleKeyDown = async (event: React.KeyboardEvent) => {
    if (input.trim() === '') return;

    if (event.key === 'Enter') {

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
    }
  };

  // Scroll to the bottom whenever new messages are added
  useEffect(() => {
    // Get messages for thread_id
    if (thread_id) {
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
    // Scroll into view    
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [lingodaMessages]);

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="chat-container" ref={messageEndRef}>
      
      <div className="messages-container" ref={messageEndRef}>
        {lingodaMessages && lingodaMessages.slice(1).map((message, index) => (
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
        {loading ? 
          <p>Asking the AI Teacher...</p> 
          :
          <> 
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="message-input"
              onKeyDown={handleKeyDown}
            />
            <SendIconButton onClick={handleSendMessage} />
          </>
        }
      </div>

    </div>
  );
};

export default ChatScrolling;
