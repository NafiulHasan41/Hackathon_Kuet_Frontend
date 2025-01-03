"use client";

import { useState } from "react";
import axios from "axios";
import useAxios from "@/hooks/useAxios";
import useToast from "@/hooks/useToast";

interface PdfResult {
  _id: string;
  title: string;
  text: string;
}

interface UserResult {
  _id: string;
  name: string;
  email: string;
}

export default function SearchComponent() {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<{
    pdfResults: PdfResult[];
    userResults: UserResult[];
  } | null>(null);
   const axiosInstance = useAxios();
   const showToast = useToast();
  const handleSearch = async () => {
    if (!query.trim()) return;

    setIsLoading(true);

    try {
      const { data } = await axiosInstance.get(`/api/search`, { params: { query } });
      setResults(data);
    } catch (error) {
      
        if (axios.isAxiosError(error)) {
            showToast("error", (error.response?.data as { message?: string })?.message || "An error occurred");
          } else if (error instanceof Error) {
            showToast("error", error.message);
          } else {
            showToast("error", "An unknown error occurred");
          }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-4">
        <h1 className="text-2xl font-semibold mb-4 text-center">
          App-Wide Search
        </h1>
        <div className="flex items-center gap-2 mb-4">
          <input
            type="text"
            placeholder="Search for PDFs or users..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 border border-gray-300 rounded-md px-4 py-2"
          />
          <button
            onClick={handleSearch}
            disabled={isLoading}
            className={`px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Searching..." : "Search"}
          </button>
        </div>
        <div>
          {results ? (
            <>
              <h2 className="text-xl font-semibold mb-2">PDF Results</h2>
              {results.pdfResults.length > 0 ? (
                <ul className="mb-4 space-y-2">
                  {results.pdfResults.map((pdf) => (
                    <li
                      key={pdf._id}
                      className="border border-gray-300 p-3 rounded-md"
                    >
                      <h3 className="font-bold">{pdf.title || "Untitled"}</h3>
                      <p className="text-gray-600 text-sm">{pdf.text}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No PDF results found.</p>
              )}

              <h2 className="text-xl font-semibold mb-2">User Results</h2>
              {results.userResults.length > 0 ? (
                <ul className="space-y-2">
                  {results.userResults.map((user) => (
                    <li
                      key={user._id}
                      className="border border-gray-300 p-3 rounded-md"
                    >
                      <h3 className="font-bold">{user.name}</h3>
                      <p className="text-gray-600 text-sm">{user.email}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No user results found.</p>
              )}
            </>
          ) : (
            <p className="text-gray-500 text-center">Search results will appear here.</p>
          )}
        </div>
      </div>
    </div>
  );
}
