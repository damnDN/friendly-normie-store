import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <div>
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      <Link to={`/products/${product.id}`}>View</Link>
    </div>
  );
}
