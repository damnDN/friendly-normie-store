import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <div className="inline-flex flex-col h-100.5 w-70.5 overflow-hidden border border-black/20 rounded-xl bg-black/10">
      <img className="h-[75%]" src={product.img} alt={product.name} />
      <div className="flex flex-col items-center mx-2">
        <div className="text-2xl italic self-start">{product.name}</div>
        <p>${product.price}</p>
        <Link to={`/products/${product.id}`}>
          <button className="cursor-pointer bg-black/30 hover:bg-black/20 transition-[background-color] duration-200 ease-in-out rounded-2xl px-5 py-2">
            view
          </button>
        </Link>
      </div>
    </div>
  );
}
