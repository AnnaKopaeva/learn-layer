import AllCards from "@/components/Cards/AllCards";
import CreateCard from "@/components/Cards/CreateCard";

export default function Page() {
  return (
    <div className="p-4">
      <div className="mb-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">My cards</h1>
        <CreateCard />
      </div>
      <AllCards />
    </div>
  );
}
