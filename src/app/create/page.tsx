import Post from "../_components/create";

export default function Create() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Create a product
      </h2>
      <div className="w-full max-w-sm">
        <Post />
      </div>
    </div>
  );
}
