import useAxios from "@/hooks/useAxios";
import useToast from "@/hooks/useToast";
import axios from "axios";
import React, { useEffect, useState } from "react";


interface IUserMetrics {
  wordsTranslated: number;
  storiesWritten: number;
  chatbotInteractions: number;
}

const ShowMetric: React.FC = () => {
  const [metrics, setMetrics] = useState<IUserMetrics | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const axiosInstance = useAxios();
  const showToast = useToast();

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        setLoading(true);
        const { data } = await axiosInstance.get("/api/user/metrics");
        setMetrics(data);
        setLoading(false);
      } catch (error) {
        if (axios.isAxiosError(error)) {
            showToast("error", (error.response?.data as { message?: string })?.message || "An error occurred");
          } else if (error instanceof Error) {
            showToast("error", error.message);
          } else {
            showToast("error", "An unknown error occurred");
          }
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-lg max-w-4xl mx-auto mt-8">
    <h1 className="text-3xl font-semibold text-center text-blue-600 mb-6">User Insights</h1>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
        <div className="bg-blue-100 p-4 rounded-full">
          <svg className="w-10 h-10 text-blue-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0 2a10 10 0 110-20 10 10 0 010 20z" clipRule="evenodd" />
          </svg>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Metrics Overview</h2>
          <p className="text-gray-600 mt-2"><strong>Words Translated:</strong> {metrics?.wordsTranslated}</p>
          <p className="text-gray-600"><strong>Stories Written:</strong> {metrics?.storiesWritten}</p>
          <p className="text-gray-600"><strong>Chatbot Interactions:</strong> {metrics?.chatbotInteractions}</p>
        </div>
      </div>
  
      <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
        <div className="bg-green-100 p-4 rounded-full">
          <svg className="w-10 h-10 text-green-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12 4a8 8 0 10-4 0 8 8 0 004 0zM3.293 6.707a1 1 0 011.414 0L10 10.586l5.293-5.879a1 1 0 111.414 1.414l-6 6.572a2 2 0 01-2.828 0l-6-6.572a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Additional Insights</h2>
          <p className="text-gray-600 mt-2"><strong>Words Translated:</strong> {metrics?.wordsTranslated}</p>
          <p className="text-gray-600"><strong>Stories Written:</strong> {metrics?.storiesWritten}</p>
          <p className="text-gray-600"><strong>Chatbot Interactions:</strong> {metrics?.chatbotInteractions}</p>
        </div>
      </div>
    </div>
  </div>
  
  );
};

export default ShowMetric;
