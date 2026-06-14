import { products } from "../data/products";
import ProductCard from "../components/product/ProductCard";

export default function Products() {
  return (
    <div>
      <div className="text-4xl italic">PRODUCTS</div>
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
