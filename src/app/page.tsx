import Convert from "@/components/converter/Convert";
import SearchComponent from "@/components/user/Search";


export default function Home() {
  return (
  <div>
    <Convert/>
    <div className=" mt-10">
     <SearchComponent/>
    </div>
  </div> 
  );
}
