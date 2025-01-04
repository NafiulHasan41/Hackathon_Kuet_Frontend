import Chatbot from "@/components/converter/Chatbot";
import PrivateRoute from "@/provider/PrivateRoute";




export default function page() {
  
 
  return (
    <div>
      <PrivateRoute>
      <Chatbot/>
      </PrivateRoute>
    </div>
  );
}
