import Convert from "@/components/converter/Convert";
import SearchComponent from "@/components/user/Search";
import PrivateRoute from "@/provider/PrivateRoute";


export default function Home() {
  return (
  <div>
    <PrivateRoute>
    <Convert/>
    <div className=" mt-10">
     <SearchComponent/>
    </div>
    </PrivateRoute>
  </div> 
  );
}
