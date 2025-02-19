import LogoutButton from "@/components/Header/LogoutButton";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-gray-800 px-8 py-6 flex justify-between items-center shadow-md">
      <Link href="/" className="flex items-center cursor-pointer">
        <Image src="/icon.png" alt="Logo" width={40} height={40} />
        <h1 className="text-xl ml-2 bg-gradient-to-r from-blue-500 via-violet-600 to-purple-700 bg-clip-text text-transparent">
          CardFlow
        </h1>
      </Link>
      <LogoutButton />
    </header>
  );
}
