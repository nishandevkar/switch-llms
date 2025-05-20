import { Box, Paper, Typography } from "@mui/material";
import { useEffect, useRef } from "react";
import GeminiResponse from "./GeminiResponse";

interface ResponseSpaceProps {
  messages: string[];
}
const ResponseSpace = ({ messages }: ResponseSpaceProps) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
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
      {messages.map((msg, index) => (
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
              <Typography variant="body1">{msg}</Typography>
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
                bgcolor: "primary",
                color: "primary",
                borderRadius: 2,
                borderTopRightRadius: 0,
              }}
            >
              <Typography variant="body1">
                {<GeminiResponse message={msg}></GeminiResponse>}
              </Typography>
            </Paper>
          </Box>
        </>
      ))}
      {/* <Box
          sx={{
            alignSelf: 'flex-start', // Right align
            maxWidth: '70%',
          }}><GeminiResponse message={"message"}></GeminiResponse></Box> */}
      <div ref={bottomRef} />
    </Box>
  );
};

export default ResponseSpace;
