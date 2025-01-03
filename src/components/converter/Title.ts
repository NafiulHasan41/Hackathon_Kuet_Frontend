import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Google Generative AI client with your API key
const key = process.env.NEXT_PUBLIC_API_GEMINI_URL || " ";
const genAI = new GoogleGenerativeAI(key);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


export async function generateTitleAndCaption(text: string): Promise<{ title: string; caption: string }> {
  try {
    // Define the prompt to generate the title and caption
    const prompt = `
      Analyze the following text and provide a suitable title and a short, engaging caption:
      ---
      ${text}
    `;

    // Use the model to generate content
    const result = await model.generateContent(prompt);

    // Extract title and caption from the response
    const responseText = result.response.text(); // Adjust based on the SDK response format
    const [title, caption] = responseText.split("\n").map((line) => line.trim());

    return {
      title: title || "Untitled", // Fallback to "Untitled" if title is missing
      caption: caption || "No caption available", // Fallback if caption is missing
    };
  } catch (error) {
    console.error("Error generating title and caption:", error);
    throw new Error("Failed to generate title and caption. Please try again.");
  }
}
