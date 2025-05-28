import { useState } from 'react';
import ChatInput from './ChatInput';
import ResponseSpace from './ResponseSpace';
import { fetchGeminiMessage } from './fetchGeminiMessage.ts';
import { fetchGroqMessage } from './fetchGroqMessages.ts';
import { Label } from './ui/label.tsx';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from './ui/select.tsx';
import { Card } from './ui/card';

export type MessagePair = {
  user: string;
  bot: string;
  model: string;
};

const ChatPage = () => {
  const [chatHistory, setChatHistory] = useState<MessagePair[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [llmModel, setLLMModel] = useState('gemini');

  const handleSendMessage = async (msg: string) => {
    setIsLoading(true);
    setChatHistory(prev => [...prev, { user: msg, bot: '', model: llmModel }]);

    try {
      let response = '';
      if (llmModel === 'groq') {
        response = await fetchGroqMessage(msg);
      } else if (llmModel === 'gemini') {
        response = await fetchGeminiMessage(msg);
      } else {
        response = 'Invalid model selected';
      }

      setChatHistory(prev => {
        const updated = [...prev];
        updated[updated.length - 1] = { user: msg, bot: response, model: llmModel };
        return updated;
      });
    } catch (error) {
      console.error('Error fetching response:', error);
      setChatHistory(prev => {
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
      <Card className="w-2xl p-4 my-4 mx-auto">
        <div className="space-y-2">
          <Label htmlFor="select-model">Select Model</Label>
          <Select value={llmModel} onValueChange={setLLMModel}>
            <SelectTrigger id="select-model" className="w-full">
              <SelectValue placeholder="Select a model" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem  value="groq">LLaMa (Groq)</SelectItem>
              <SelectItem  value="gemini">Gemini</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {chatHistory.length>0 && <Card className='w-2xl p-4 my-2 mx-auto overflow-y-auto'>
        <ResponseSpace chatHistory={chatHistory} isLoading={isLoading} />
      </Card>}
        <ChatInput onSend={handleSendMessage} />

    </>
  );
};

export default ChatPage;
