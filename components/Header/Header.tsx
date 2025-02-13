import LogoutButton from "@/components/Header/LogoutButton";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-gray-800 p-4 flex justify-between items-center">
      <Link href="/" className="flex items-center">
        <Image src="/icon.png" alt="Logo" width={40} height={40} />
        <h1 className="text-white text-xl ml-2">Learn more</h1>
      </Link>
      <LogoutButton />
    </header>
  );
}
