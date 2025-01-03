'use client'
import { useContext, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "../ui/button";
import { GoogleGenerativeAI } from "@google/generative-ai"; // Import the SDK
import axios from "axios";
import useToast from "@/hooks/useToast";
import useAxios from "@/hooks/useAxios";
import { AuthContext } from "@/provider/AuthProvider";

// Get the API key from environment variables
const key = process.env.NEXT_PUBLIC_API_GEMINI_URL || " ";

export default function Convert() {
    const [banglishText, setBanglishText] = useState("");
    const [banglaOutput, setBanglaOutput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [pdfLoading, setPdfLoading] = useState(false);

    const showToast = useToast();
    const axiosInstance= useAxios();
    const authContext = useContext(AuthContext);
    if (!authContext) {
      throw new Error("AuthContext must be used within an AuthProvider");
    }
  
    const { user } = authContext;

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
            if (axios.isAxiosError(error)) {
                showToast("error", (error.response?.data as { message?: string })?.message || "An error occurred");
              } else if (error instanceof Error) {
                showToast("error", error.message);
              } else {
                showToast("error", "An unknown error occurred");
              }
            setBanglaOutput("Translation failed.");
        } finally {
            setIsLoading(false); // Set loading state to false when done
        }
    };

    //handle export pdf 
    const handleExportPdf = async () => {
        if(banglaOutput === "") {
            showToast("error", "Please convert Banglish to Bangla first");
            return;
        }
        setPdfLoading(true); 
        try{
               await axiosInstance.post("/api/pdfs/pdf", {
                text:banglaOutput,
                posterId: user?.id
             });
               showToast("success", "PDF exported successfully");

        }
        catch (error) {
            if (axios.isAxiosError(error)) {
                showToast("error", (error.response?.data as { message?: string })?.message || "An error occurred");
              } else if (error instanceof Error) {
                showToast("error", error.message);
              } else {
                showToast("error", "An unknown error occurred");
              }
        }
        finally {
            setPdfLoading(false); 
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
                <Button onClick={()=> handleExportPdf()} disabled={isLoading || pdfLoading}  className=" bg-sky-400 font-semibold " >
                    {pdfLoading ? "Exporting..." : "Export PDF"} {/* Show loading text */}
                    </Button>
            </div>
            {isLoading && <div className="text-center mt-4">Loading...</div>} {/* Loading indicator */}
        </div>
    );
}
