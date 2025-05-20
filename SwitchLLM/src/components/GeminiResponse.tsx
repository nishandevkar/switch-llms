import { useEffect, useState } from 'react';


interface GeminiResponseProps{
  message: string;
}

const GeminiResponse = (geminiResponse: GeminiResponseProps) => {
  const [response, setResponse] = useState<string>('Loading...');
  const GEMINI_API_KEY = 'AIzaSyAtWUwO25Rc0Rx2HsN7kcZZf1GvTNQHuIM';
  
  useEffect(() => {
  const callGeminiAPI = async () => {

    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [{text: geminiResponse.message}],
              },
            ],
          }),
        }
      );

      const data = await res.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response';
      
      setResponse(text);
    } catch (error) {
      console.error('Error calling Gemini:', error);
      return 'Error occurred';
    } finally {
      return null;
    }
  }
  if (geminiResponse) {
    callGeminiAPI();
  }
}, [geminiResponse]);

  return (
    <>
      <p>{response}</p>
    </>
  );
};

export default GeminiResponse;
