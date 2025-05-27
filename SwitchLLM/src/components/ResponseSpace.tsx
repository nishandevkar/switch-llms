import { Box, CircularProgress, Paper, Typography } from "@mui/material";
import { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import type { MessagePair } from "./ChatPage";
interface ResponseSpaceProps {
  chatHistory: MessagePair[];
  isLoading?: boolean; // Optional prop for loading state
}
const ResponseSpace = ({ chatHistory, isLoading }: ResponseSpaceProps) => {
  const bottomRef = useRef<HTMLDivElement>(null);

   const getBubbleColor = (model: string) =>
    model === "groq" 
  ? "#d2f8d2"  
  : "#d2e3f8"; 
  // Scroll to bottom when messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);
  return (
    <Box
      sx={{
        p: 2,
        mb: 10,
        overflowY: "auto",
        maxHeight: "calc(100vh - 150px)",
        display: "flex",
        flexDirection: "column",
        gap: 1,

      }}
    >
  {chatHistory.map((pair, index) => {
  const bubbleColor = getBubbleColor(pair.model); 
  return (
    <>
      {/* User sent message bubble */}
      <Box
        key={index - 1}
        sx={{
          alignSelf: "flex-end", // Right align
          maxWidth: "70%",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 1.5,
            bgcolor: "primary.main",
            color: "primary.contrastText",
            borderRadius: 2,
            borderTopRightRadius: 0,
          }}
        >
          <Typography variant="body1">{pair.user}</Typography>
        </Paper>
      </Box>

      {/* LLM Response bubble */}
      <Box
        key={index + 1}
        sx={{
          alignSelf: "flex-start", // Right align
          maxWidth: "70%",
          wordWrap: 'break-word',
          whiteSpace: 'pre-wrap',
        }}
      >
        <Paper
          elevation={4}
          sx={{
            p: 1.5,
            bgcolor: bubbleColor,
            color: "primary",
            borderRadius: 2,
            borderTopRightRadius: 0,
          }}
        >
          <Typography variant="body1">
            <Box
  sx={{
    '& *': {
      wordBreak: 'break-word',
      overflowWrap: 'break-word',
    },
    '& pre, & code': {
      whiteSpace: 'pre-wrap',
      wordBreak: 'break-word',
    },
  }}>
    {chatHistory.length -1 === index && isLoading && (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'white' }}>
      <CircularProgress size={20} thickness={4} />
      <span>Bot is typing...</span>
    </div>
  )}
    <ReactMarkdown>{pair.bot}</ReactMarkdown>
  </Box>
          </Typography>
        </Paper>
      </Box>
    </>
  );
})}
      
      <div ref={bottomRef} />
    </Box>
  );
};

export default ResponseSpace;
