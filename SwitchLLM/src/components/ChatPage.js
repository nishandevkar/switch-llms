import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import ChatInput from './ChatInput';
import ResponseSpace from './ResponseSpace';
const ChatPage = () => {
    const [messages, setMessages] = useState([]);
    const handleSendMessage = (msg) => {
        setMessages((prev) => [...prev, msg]);
        console.log('User sent:', msg);
    };
    return (_jsxs(_Fragment, { children: [_jsx(ResponseSpace, { messages: messages }), _jsx(ChatInput, { onSend: handleSendMessage })] }));
};
export default ChatPage;
