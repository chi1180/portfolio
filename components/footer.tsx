import Image from "next/image";

export default function Footer() {
  return (
    <footer className="h-96 py-96 flex justify-center items-center gap-12">
      <div className="h-32 aspect-square relative">
        <Image src="/icon.png" alt="Logo" fill />
      </div>

      <div className="flex flex-col gap-4 items-end">
        <h1 className="text-3xl">Chi1180 portfolio site_</h1>
        <p className="text-sm pr-12">@2025</p>
      </div>
    </footer>
  );
}
