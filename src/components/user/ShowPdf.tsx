'use client';

import { useState } from "react";
import useSWR from "swr";
import axios from "axios";
import { Table, TableBody, TableCell, TableCaption, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import useAxios from "@/hooks/useAxios";
import useToast from "@/hooks/useToast";
import jsPDF from "jspdf"; // Import jsPDF
import "jspdf-autotable";
import { encode } from "base64-arraybuffer";

// Import Google Generative AI and initialize it
import { GoogleGenerativeAI } from "@google/generative-ai";

const key = process.env.NEXT_PUBLIC_API_GEMINI_URL || " ";
const genAI = new GoogleGenerativeAI(key);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Helper function to generate title and caption in Bangla
export async function generateTitleAndCaption(text: string): Promise<{ title: string; caption: string }> {
    try {
      const titlePrompt = `
        বিশ্লেষণ করুন নিম্নলিখিত পাঠ্যটি এবং একটি উপযুক্ত শিরোনাম প্রদান করুন, শুধুমাত্র শিরোনামটি লিখুন:
        ---
        ${text}
      `;
  
      const captionPrompt = `
        বিশ্লেষণ করুন নিম্নলিখিত পাঠ্যটি এবং একটি সংক্ষিপ্ত ও আকর্ষণীয় বর্ণনা দিন, শুধুমাত্র বর্ণনাটি লিখুন:
        ---
        ${text}
      `;
  
      // Generate title
      const titleResult = await model.generateContent(titlePrompt);
      const title = titleResult.response.text().trim();
  
      // Generate caption
      const captionResult = await model.generateContent(captionPrompt);
      const caption = captionResult.response.text().trim();
  
      return {
        title: title || "শিরোনাম পাওয়া যায়নি",
        caption: caption || "বর্ণনা পাওয়া যায়নি",
      };
    } catch (error) {
      console.error("Error generating title and caption:", error);
      return { title: "শিরোনাম পাওয়া যায়নি", caption: "বর্ণনা পাওয়া যায়নি" };
    }
  }

// Define the PdfFile interface
interface PdfFile {
  _id: string;
  text: string;
  isPublic: boolean;
  posterId: string;
  title?: string;
  caption?: string;
}

const banglaFonts = ["SolaimanLipi", "Nikosh", "Kalpurush"]; // List of Bangla fonts

interface PdfManagementProps {
  id: string; // Prop for user ID or related identifier
}

export default function ShowPdf({ id }: PdfManagementProps) {
  const axiosInstance = useAxios();
  const showToast = useToast();

  const fetcher = async (url: string): Promise<PdfFile[]> => {
    const { data: pdfList } = await axiosInstance.get(url);

    const updatedPdfList = await Promise.all(
      pdfList.map(async (pdf: PdfFile) => {
        if (!pdf.title || !pdf.caption) {
          const { title, caption } = await generateTitleAndCaption(pdf.text);
          return { ...pdf, title, caption };
        }
        return pdf;
      })
    );

    return updatedPdfList;
  };

  const { data: pdfList, error, isValidating, mutate } = useSWR<PdfFile[]>(
    `/api/pdfs/pdf/public/${id}`, // Fetching based on the provided `id`
    fetcher
  );

  
  const [selectedFont, setSelectedFont] = useState<Record<string, string>>({}); // Track selected font for each PDF

  if (error) return <div>Failed to load PDFs</div>;
  if (isValidating || !pdfList) return <div>Loading...</div>;

  const handleFontChange = (pdfId: string, font: string) => {
    setSelectedFont((prev) => ({ ...prev, [pdfId]: font }));
  };

  const handleDownload = async (pdf: PdfFile) => {
    try {
      const doc = new jsPDF();
      const font = selectedFont[pdf._id] || "SolaimanLipi";

      const fontResponse = await axios.get(`/fonts/${font}.ttf`, { responseType: "arraybuffer" });
      const fontBase64 = encode(fontResponse.data);

      doc.addFileToVFS(`${font}.ttf`, fontBase64);
      doc.addFont(`${font}.ttf`, font, "normal");
      doc.setFont(font);

      doc.text(`Title: ${pdf.title || "Untitled"}`, 10, 10);
      doc.text(`Caption: ${pdf.caption || "No caption available"}`, 10, 20);

      doc.autoTable({
        head: [["Content"]],
        body: [[pdf.text]],
        startY: 30,
        margin: { left: 10, right: 10 },
        styles: { font: font, fontSize: 12 },
      });

      doc.save(`${pdf.title || "document"}.pdf`);
      showToast("success", "PDF downloaded successfully");
    } catch (error) {
      showToast("error", "Failed to download PDF");
      console.error(error);
    }
  };

 
 

  return (
    <div>
      <Table className="bg-white rounded-lg shadow-md">
        <TableCaption className="text-left font-medium">Your PDFs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Caption</TableHead>
            <TableHead>Font</TableHead>
            <TableHead>Download</TableHead>
            
          </TableRow>
        </TableHeader>
        <TableBody>
          {pdfList.map((pdf: PdfFile) => (
            <TableRow key={pdf._id}>
              <TableCell>{pdf.title || "No title available"}</TableCell>
              <TableCell>{pdf.caption || "No caption available"}</TableCell>
              
              <TableCell>
                <select
                  value={selectedFont[pdf._id] || ""}
                  onChange={(e) => handleFontChange(pdf._id, e.target.value)}
                  className="p-2 border border-gray-300 rounded-md"
                >
                  <option value="">Select Font</option>
                  {banglaFonts.map((font) => (
                    <option key={font} value={font}>
                      {font}
                    </option>
                  ))}
                </select>
              </TableCell>
              <TableCell>
                <Button
                  onClick={() => handleDownload(pdf)}
                  className="bg-blue-500 text-white hover:bg-blue-600"
                >
                  <Download />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
