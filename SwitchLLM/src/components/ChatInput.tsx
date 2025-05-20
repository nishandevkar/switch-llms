import { Box, IconButton, InputAdornment } from '@mui/material';
import {useForm} from 'react-hook-form';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
type FormData = {
    chatInput: string;
  };
const ChatInput = ({ onSend }: { onSend: (message: string) => void }) => {

    const {register,handleSubmit, formState: {errors}, reset} = useForm<FormData>();
    const onSubmit = (data: FormData) => {
        onSend(data.chatInput);     // 🔼 Lift state up
        reset(); 
      };

  return (
   
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        bgcolor: 'background.paper',
        px: 1,
        py: 1,
        boxSizing: 'border-box',
    
      }}>
        <TextField
  fullWidth
  {...register('chatInput', { required: 'Type something...' })}
  error={!!errors.chatInput}
  id="filled-search"
  label="Type here..."
  type="search"
  variant="filled"
  margin="normal"
  size="small"
  helperText={errors.chatInput?.message}
  InputProps={{
    endAdornment: (
      <InputAdornment position="end">
        <IconButton type="submit" color="primary">
          <SendIcon />
        </IconButton>
      </InputAdornment>
    ),
  }}
/>
      </Box>
        
    
  );
}

export default ChatInput