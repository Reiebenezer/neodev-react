import { GoogleGenAI } from '@google/genai';

export default async function handler(req: Request) {
  const { predicted_label } = await req.json();

  // Access the key SECURELY on the server side
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-lite-preview-09-2025',
    contents: `
      CONTEXT: You are a model that gives "Did You Know?" tips to students who are trying to learn web development.
      INPUT: a UI component
      OUTPUT: A brief, but detailed "Did You Know?" message about this specific UI component.

      When responding, you must follow this format: 
      A <component name> is <description>, composed primarily of <elements>. It is mainly used in <application>. <Additional tips>. Limit your response to a maximum of 35 words.
      Only respond in plaintext. Never mention the words "Do you know?" rather start with the fun fact.

      The UI component you should discuss is: ${predicted_label}
    `,
  });

  return new Response(JSON.stringify({ text: response?.text ?? '' }), {
    headers: { 'Content-Type': 'application/json' },
  });
}
