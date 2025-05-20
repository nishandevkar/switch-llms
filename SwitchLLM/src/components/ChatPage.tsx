
import { useState } from 'react'
import ChatInput from './ChatInput'
import ResponseSpace from './ResponseSpace'
const ChatPage = () => {
    const [messages, setMessages] = useState<string[]>([]);
    const handleSendMessage = (msg: string) => {
        setMessages((prev) => [...prev, msg]);
        console.log('User sent:', msg);
      };
  return (
    <>
    <ResponseSpace messages={messages}></ResponseSpace>
    <ChatInput onSend={handleSendMessage}></ChatInput>
    </>
  )
}

export default ChatPage