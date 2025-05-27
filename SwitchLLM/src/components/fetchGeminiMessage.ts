

/**
 * Fetches a response from the Gemini API for a given message.
 * @param message The message to send to Gemini.
 * @param GEMINI_API_KEY Your Gemini API key.
 * @returns The response string from Gemini.
 */
export async function fetchGeminiMessage(message: string): Promise<string> {
  const GEMINI_API_KEY = "AIzaSyAtWUwO25Rc0Rx2HsN7kcZZf1GvTNQHuIM"
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
              parts: [{ text: message }],
            },
          ],
        }),
      }
    );

    const data = await res.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response';
  } catch (error) {
    console.error('Error calling Gemini:', error);
    return 'Error occurred';
  }
}
export default fetchGeminiMessage;
