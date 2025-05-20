import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Paper, Typography } from "@mui/material";
import { useEffect, useRef } from "react";
import GeminiResponse from "./GeminiResponse";
const ResponseSpace = ({ messages }) => {
    const bottomRef = useRef(null);
    // Scroll to bottom when messages change
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);
    return (_jsxs(Box, { sx: {
            p: 2,
            mb: 10,
            overflowY: "auto",
            maxHeight: "calc(100vh - 150px)",
            display: "flex",
            flexDirection: "column",
            gap: 1,
        }, children: [messages.map((msg, index) => (_jsxs(_Fragment, { children: [_jsx(Box, { sx: {
                            alignSelf: "flex-end", // Right align
                            maxWidth: "70%",
                        }, children: _jsx(Paper, { elevation: 3, sx: {
                                p: 1.5,
                                bgcolor: "primary.main",
                                color: "primary.contrastText",
                                borderRadius: 2,
                                borderTopRightRadius: 0,
                            }, children: _jsx(Typography, { variant: "body1", children: msg }) }) }, index - 1), _jsx(Box, { sx: {
                            alignSelf: "flex-start", // Right align
                            maxWidth: "70%",
                            wordWrap: 'break-word',
                            whiteSpace: 'pre-wrap',
                        }, children: _jsx(Paper, { elevation: 4, sx: {
                                p: 1.5,
                                bgcolor: "primary",
                                color: "primary",
                                borderRadius: 2,
                                borderTopRightRadius: 0,
                            }, children: _jsx(Typography, { variant: "body1", children: _jsx(GeminiResponse, { message: msg }) }) }) }, index + 1)] }))), _jsx("div", { ref: bottomRef })] }));
};
export default ResponseSpace;
