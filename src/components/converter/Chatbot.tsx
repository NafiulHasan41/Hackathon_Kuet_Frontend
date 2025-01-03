'use client'
import { useState, useEffect, useRef } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "../ui/button";
import { GoogleGenerativeAI } from "@google/generative-ai"; // Import the SDK

// Get the API key from environment variables
const key = process.env.NEXT_PUBLIC_API_GEMINI_URL || " ";

interface Message {
    sender: "user" | "bot";
    text: string;
}

export default function Chatbot() {
    const [userQuery, setUserQuery] = useState(""); // User input
    const [messages, setMessages] = useState<Message[]>([]); // Chat history
    const [isLoading, setIsLoading] = useState(false); // Loading state

    const chatContainerRef = useRef<HTMLDivElement | null>(null); // Reference for the chat container

    // Initialize the Google Generative AI client with your API key
    const genAI = new GoogleGenerativeAI(key); // Pass the key directly as a string
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Retrieve the chat history from localStorage when the component mounts
    useEffect(() => {
        const savedMessages = localStorage.getItem("chatHistory");
        if (savedMessages) {
            setMessages(JSON.parse(savedMessages));
        }
    }, []);

    // Store chat history in localStorage whenever messages are updated
    useEffect(() => {
        if (messages.length > 0) {
            localStorage.setItem("chatHistory", JSON.stringify(messages));
        }

        // Scroll to the bottom of the chat container after messages are updated
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    // Handle the "Send" button click to get a chatbot response
    const handleQuery = async () => {
        if (!userQuery.trim()) return; // Prevent empty messages

        // Add the user's message to the chat history
        setMessages((prevMessages) => [
            ...prevMessages,
            { sender: "user", text: userQuery }
        ]);
        setUserQuery(""); // Clear input

        setIsLoading(true); // Set loading state to true
        try {
            // Define the prompt for the chatbot to handle Banglish input
            const prompt = `You are a chatbot that understands both Banglish and Bangla. Respond to the following query in Bangla: ${userQuery}`;

            // Use the model to generate a response to the query
            const result = await model.generateContent(prompt);
            const responseText = result.response.text(); // Extract the response text from the result

            // Add the bot's response to the chat history
            setMessages((prevMessages) => [
                ...prevMessages,
                { sender: "bot", text: responseText }
            ]);
        } catch (error) {
            console.error("Error with Gemini AI:", error);
            setMessages((prevMessages) => [
                ...prevMessages,
                { sender: "bot", text: "Sorry, I couldn't process your request." }
            ]);
        } finally {
            setIsLoading(false); // Set loading state to false when done
        }
    };

    return (
        <div className="m-4 max-w-lg mx-auto border p-4 rounded-lg shadow-lg">
            <h1 className=" text-xl text-black font-bold">বাংলা চ্যাট</h1>
            <div
                ref={chatContainerRef} // Attach the reference to the chat container
                className="flex flex-col gap-2 overflow-auto max-h-[400px] pb-4"
                id="chat-history"
            >
                {/* Reverse the messages to display in the correct order */}
                {messages.reverse().map((message, index) => (
                    <div
                        key={index}
                        className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"} mb-2`}
                    >
                        <div
                            className={`p-2 rounded-lg max-w-[70%] ${message.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                        >
                            {message.text}
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex flex-col gap-4 mt-4">
                <Textarea
                    className="min-h-[100px]"
                    placeholder="Ask something in Banglish or Bangla"
                    value={userQuery}
                    onChange={(e) => setUserQuery(e.target.value)}
                    disabled={isLoading}
                />
                <div className="flex justify-between items-center ">
                    <Button onClick={handleQuery} disabled={isLoading}  className=" bg-sky-400 font-semibold " >
                        {isLoading ? "Processing..." : "Send"}
                    </Button>
                </div>
            </div>

            {isLoading && (
                <div className="text-center mt-4 text-gray-500">Bot is typing...</div>
            )}
        </div>
    );
}
