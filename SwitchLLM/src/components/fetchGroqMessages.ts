// fetchGroqMessage.ts

const GROQ_API_KEY = "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"; // Replace with your real key

export async function fetchGroqMessage(message: string): Promise<string> {
  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama3-70b-8192", // or try "mixtral-8x7b-32768"
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: message },
        ],
        temperature: 0.7,
      }),
    });

    const data = await res.json();
    return data.choices?.[0]?.message?.content || "No response from Groq";
  } catch (error) {
    console.error("Groq API error:", error);
    return "Error occurred while calling Groq API";
  }
}
