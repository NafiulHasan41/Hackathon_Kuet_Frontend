import { useState } from "react";
import { Download } from "lucide-react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from "@radix-ui/react-switch";

interface PdfFile {
  pdfTitle: string;
  public: boolean;
}

const initialPdfList: PdfFile[] = [
  {
    pdfTitle: "Operating System",
    public: false,
  },
  {
    pdfTitle: "Microprocessors",
    public: true,
  },
];

interface UserDetailsProps {
  userName: string;
  userEmail: string;
  wordsTranslated: number;
  storiesWritten: number;
  chatbotInteractions?: number;
}

export default function Profile({
  userName,
  userEmail,
  wordsTranslated,
  storiesWritten,
  chatbotInteractions,
}: UserDetailsProps) {
  const [pdfList, setPdfList] = useState<PdfFile[]>(initialPdfList);

  const handleSwitchChange = (index: number) => {
    setPdfList((prevList) =>
      prevList.map((pdf, i) =>
        i === index ? { ...pdf, public: !pdf.public } : pdf
      )
    );
  };

  return (
    <div className="space-y-8 p-6 bg-gray-100 rounded-md shadow-md">
      {/* User Information */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md w-full md:w-1/3">
          <p className="text-xl font-semibold">{userName}</p>
          <p className="text-gray-600">{userEmail}</p>
        </div>
        <div className="flex flex-col md:flex-row justify-evenly items-center gap-6 w-full md:w-2/3">
          <div className="text-center">
            <p className="text-gray-700">Number of Words Translated</p>
            <p className="text-xl font-bold">{wordsTranslated}</p>
          </div>
          <div className="text-center">
            <p className="text-gray-700">Number of Stories Written</p>
            <p className="text-xl font-bold">{storiesWritten}</p>
          </div>
          {chatbotInteractions !== undefined && (
            <div className="text-center">
              <p className="text-gray-700">Chatbot Interactions</p>
              <p className="text-xl font-bold">{chatbotInteractions}</p>
            </div>
          )}
        </div>
      </div>

      {/* PDF List Table */}
      <div>
        <Table className="bg-white rounded-lg shadow-md">
          <TableCaption className="text-left font-medium">
            Your Stories
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>PDF Title</TableHead>
              <TableHead>Public</TableHead>
              <TableHead>Download</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pdfList.map((pdf, index) => (
              <TableRow key={pdf.pdfTitle}>
                <TableCell className="font-medium">{pdf.pdfTitle}</TableCell>
                <TableCell>
                  <Switch
                    checked={pdf.public}
                    onCheckedChange={() => handleSwitchChange(index)}
                    className={`w-12 h-6 flex items-center justify-${
                      pdf.public ? "end" : "start"
                    } bg-gray-300 rounded-full p-1 transition-all ${
                      pdf.public ? "bg-green-500" : "bg-gray-300"
                    }`}
                  >
                    <span className="w-4 h-4 bg-white rounded-full shadow-md"></span>
                  </Switch>
                </TableCell>
                <TableCell>
                  <button className="p-2 text-gray-700 hover:text-blue-500 transition">
                    <Download />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
