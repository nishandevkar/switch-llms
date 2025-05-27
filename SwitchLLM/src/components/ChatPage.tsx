import { useState } from 'react';
import ChatInput from './ChatInput';
import ResponseSpace from './ResponseSpace';
import { fetchGeminiMessage } from './fetchGeminiMessage.ts';
import { fetchGroqMessage } from './fetchGroqMessages.ts';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material/Select';

export type MessagePair = {
  user: string;
  bot: string;
  model: string;
};

const ChatPage = () => {
  const [chatHistory, setChatHistory] = useState<MessagePair[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [llmModel, setLLMModel] = useState('gemini'); // default to Gemini

  const handleChange = (event: SelectChangeEvent) => {
    setLLMModel(event.target.value);
  };

  const handleSendMessage = async (msg: string) => {
    setIsLoading(true);

    // Add the user's message with an empty bot response
    setChatHistory((prev) => [...prev, { user: msg, bot: '', model: llmModel }]);

    try {
      let response = '';
      if (llmModel === 'groq') {
        response = await fetchGroqMessage(msg);
      } else if (llmModel === 'gemini') {
        response = await fetchGeminiMessage(msg);
      } else {
        response = 'Invalid model selected';
      }

      setChatHistory((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = { user: msg, bot: response, model: llmModel };
        return updated;
      });
    } catch (error) {
      console.error('Error fetching response:', error);
      setChatHistory((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = { user: msg, bot: 'Error occurred', model: llmModel };
        return updated;
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Box sx={{
        // position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bgcolor: 'background.paper',
        px: 1,
        py: 1,
        boxSizing: 'border-box',
    
      }}>
        <FormControl fullWidth>
          <InputLabel id="select-model-label">Select Model</InputLabel>
          <Select
            labelId="select-model-label"
            id="select-model"
            value={llmModel}
            label="LLM Model"
            onChange={handleChange}
          >
            <MenuItem value="groq">LLaMa (Groq)</MenuItem>
            <MenuItem value="gemini">Gemini</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <ResponseSpace chatHistory={chatHistory} isLoading={isLoading} />
      <ChatInput onSend={handleSendMessage} />
    </>
  );
};

export default ChatPage;
