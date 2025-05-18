import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import ResponseSpace from './ResponseSpace';

const ChatInput = () => {
  return (
    <Box
    sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        bgcolor: 'background.paper',
        px: 2,
        py: 1,
        boxSizing: 'border-box',
    
      }}>
      
        <ResponseSpace></ResponseSpace>
        <TextField
          fullWidth
          id="filled-search"
          label="Type here..."
          type="search"
          variant="filled"
          margin='normal'
          size='small'
        />
        </Box>
    
  );
}

export default ChatInput