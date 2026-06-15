import { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../components/product/ProductCard.jsx";

export default function Products() {
  //initialize state for products and loading/error states
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://dummyjson.com/products");
        // dummyjson returns an object like { products: [...], total: 194, ... }
        setProducts(response.data.products);
      } catch (error) {
        console.log(error);
        if (error.response) {
          console.error("Server error: ", error.response.status);
        } else {
          console.error("Request error: ", error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div className="text-xl p-4">Loading products...</div>;

  return (
    <div>
      <div className="text-4xl italic">PRODUCTS</div>
      {products?.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
