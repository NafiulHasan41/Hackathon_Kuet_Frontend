import PdfManagement from "@/components/pdf/PdfManagement";
import PrivateRoute from "@/provider/PrivateRoute";


export default function UserPage(){
    return (
        <div className=" p-5 md:p-8 max-w-screen-lg mx-auto  rounded-lg ">
          <PrivateRoute>
          <h1 className=" text-black font-bold text-xl">Managing PDF'S</h1>
          <PdfManagement/>
          </PrivateRoute>
        </div>
    )
}