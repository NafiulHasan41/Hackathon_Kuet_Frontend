import ShowPdf from "@/components/user/ShowPdf";
import PrivateRoute from "@/provider/PrivateRoute";

interface PageProps {
  params: {
    id: string; // Dynamic route parameter
  };
}

export default function Page({ params }: PageProps) {
  const { id } = params; // Extract the dynamic `id`

  return (
    <>
      <div className=" p-5 md:p-8 max-w-screen-lg mx-auto  rounded-lg ">
        <PrivateRoute>
        <ShowPdf id={id} />
        </PrivateRoute>
      </div>
    </>
  );
}
