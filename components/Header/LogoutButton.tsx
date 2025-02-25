"use client";
import { useRouter } from "next/navigation";
import { useStorage } from "@/context";

export default function LogoutButton() {
  const router = useRouter();
  const { removeItem } = useStorage();

  const logout = () => {
    removeItem("token");
    router.push("/login");
  };

  return (
    <button
      onClick={logout}
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
    >
      Logout
    </button>
  );
}
