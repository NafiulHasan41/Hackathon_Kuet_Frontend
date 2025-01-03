'use client'
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "../ui/button";
import { GoogleGenerativeAI } from "@google/generative-ai"; // Import the SDK

// Get the API key from environment variables
const key = process.env.NEXT_PUBLIC_API_GEMINI_URL || " ";

export default function Convert() {
    const [banglishText, setBanglishText] = useState("");
    const [banglaOutput, setBanglaOutput] = useState("");
    const [isLoading, setIsLoading] = useState(false); // New state for loading

    // Initialize the Google Generative AI client with your API key
    const genAI = new GoogleGenerativeAI(key); // Pass the key directly as a string
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Handle Convert Button click
    const handleConvert = async () => {
        setIsLoading(true); // Set loading state to true
        try {
            // Define the prompt to ask Gemini to translate Banglish to Bangla
            const prompt = `Translate the following Banglish text into Bangla: ${banglishText}`;

            // Use the model to generate content based on the prompt
            const result = await model.generateContent(prompt);
            const translatedText = result.response.text(); // Extract the translated text from the result

            setBanglaOutput(translatedText);
        } catch (error) {
            console.error("Error with Gemini AI:", error);
            setBanglaOutput("Translation failed.");
        } finally {
            setIsLoading(false); // Set loading state to false when done
        }
    };

    return (
        <div className="m-2">
            <div className="flex flex-row flex-wrap justify-center gap-4">
                <div className="md:w-[40%]">
                    <Textarea
                        className="min-h-[300px]"
                        placeholder="Write your Banglish story here"
                        value={banglishText}
                        onChange={(e) => setBanglishText(e.target.value)}
                    ></Textarea>
                </div>
                <div className="md:w-[40%]">
                    <Textarea
                        className="min-h-[300px]"
                        placeholder="Bangla output"
                        value={banglaOutput}
                        readOnly
                    ></Textarea>
                </div>
            </div>
            <div className="mt-4 items-end gap-3 flex justify-center">
                <Button onClick={handleConvert} disabled={isLoading} className=" bg-sky-400 font-semibold "> {/* Disable button when loading */}
                    {isLoading ? "Converting..." : "Convert to Bangla"} {/* Show loading text */}
                </Button>
                <Button disabled={isLoading}  className=" bg-sky-400 font-semibold " >Export PDF</Button>
            </div>
            {isLoading && <div className="text-center mt-4">Loading...</div>} {/* Loading indicator */}
        </div>
    );
}
