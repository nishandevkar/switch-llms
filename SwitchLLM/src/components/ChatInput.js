import { jsx as _jsx } from "react/jsx-runtime";
import { Box, IconButton, InputAdornment } from '@mui/material';
import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
const ChatInput = ({ onSend }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const onSubmit = (data) => {
        onSend(data.chatInput); // 🔼 Lift state up
        reset();
    };
    return (_jsx(Box, { component: "form", onSubmit: handleSubmit(onSubmit), sx: {
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            bgcolor: 'background.paper',
            px: 1,
            py: 1,
            boxSizing: 'border-box',
        }, children: _jsx(TextField, { fullWidth: true, ...register('chatInput', { required: 'Type something...' }), error: !!errors.chatInput, id: "filled-search", label: "Type here...", type: "search", variant: "filled", margin: "normal", size: "small", helperText: errors.chatInput?.message, InputProps: {
                endAdornment: (_jsx(InputAdornment, { position: "end", children: _jsx(IconButton, { type: "submit", color: "primary", children: _jsx(SendIcon, {}) }) })),
            } }) }));
};
export default ChatInput;
