import UserList from "@/components/user/UserShow";
import PrivateRoute from "@/provider/PrivateRoute";





export default function page() {
  
 
  return (
    <div className=" md:min-h-96">
      <PrivateRoute>
     <UserList/>
     </PrivateRoute>
    </div>
  );
}
