import ShowPdf from "@/components/user/ShowPdf";

interface PageProps {
  params: {
    id: string; // Dynamic route parameter
  };
}

export default function Page({ params }: PageProps) {
  const { id } = params; // Extract the dynamic `id`

  return (
    <>
      <div>
        <ShowPdf id={id} />
      </div>
    </>
  );
}
