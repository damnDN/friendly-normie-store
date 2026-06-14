import { useNavigate } from "react-router-dom";
import Card from "../components/ui/Card.jsx";
export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex-col ">
      <h1 className="text-center text-6xl mt-44">Welcome to Store</h1>
      <p className="ml-10">Browse our products</p>
      <Card
        title="Rawdoggers"
        desc="Come and know us"
        tags={["Punk", "Emo", "Ancestory"]}
        url="https://tailwindcss.com/_next/static/media/cover.0g8-x6e87bh6a.png"
      />
      <div className="bg-black/50">
        <button
          className="px-6 py-2 bg-black rounded-xl text-white text-center cursor-pointer"
          onClick={() => navigate("/cart")}
        >
          My Cart
        </button>
        {/* localhost:5173/cart */}
      </div>
    </div>
  );
}
