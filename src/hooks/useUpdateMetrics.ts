


import useAxios from "@/hooks/useAxios"; // Assuming you have this hook
import axios from "axios";
import useToast from "./useToast";

export const useUpdateMetrics = () => {
  const axiosInstance = useAxios(); // Custom Axios hook
  const showToast = useToast(); // Custom Toast hook

  const updateMetrics = async (action: string, value: number): Promise<void> => {
    try {
      // Sending the metrics update request to the backend
      await axiosInstance.post("/api/user/metrics/update", { action, value });
    //   showToast("success", "Metrics updated successfully");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        showToast("error", (error.response?.data as { message?: string })?.message || "An error occurred");
      } else if (error instanceof Error) {
        showToast("error", error.message);
      } else {
        showToast("error", "An unknown error occurred");
      }
    }
  };

  return updateMetrics;
};
