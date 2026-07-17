import { useParams } from "react-router-dom";
import { products } from "../data/products";
import Card from "../components/ui/Card";

export default function ProductDetail() {
  const { id } = useParams();
  console.log(useParams());
  const product = products.find((p) => p.id === Number(id));

  if (!product) return <h2>Not Found</h2>;

  return (
    <Card
      title={product.name}
      desc={`$${product.price}`}
      tags={["Punk", "Emo", "Ancestory"]}
      url={product.img}
    />
  );
}
