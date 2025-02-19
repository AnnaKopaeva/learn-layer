import AllCards from "@/components/Cards/AllCards";
import CreateCard from "@/components/Cards/CreateCard";

export default function Page() {
  return (
    <div className="p-4 w-full">
      <div className="flex justify-between items-center px-4 py-4">
        <h1 className="text-2xl font-bold">My cards</h1>
        <CreateCard />
      </div>
      <AllCards />
    </div>
  );
}
