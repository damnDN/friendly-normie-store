import { products } from "../data/products";
import ProductCard from "../components/product/ProductCard";

export default function Products() {
  return (
    <div>
      <h1>Products</h1>
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
