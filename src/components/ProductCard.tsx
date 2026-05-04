import type { Product } from "../types/Product";
import { useAppDispatch } from "../app/hooks";
import { addToCart } from "../features/cart/cartSlice";
import { Link } from "react-router-dom";

export default function ProductCard({ product }: { product: Product }) {
  const dispatch = useAppDispatch();

  const discounted =
    product.price - (product.price * product.discountPercentage) / 100;

  return (
    <div className="card">
      <img src={product.thumbnail} />

      <h3>{product.title}</h3>

      <div className="price-block">
        <span className="old-price">{product.price}$</span>
        <span className="new-price">{discounted.toFixed(2)}$</span>
        <span className="discount">
          -{product.discountPercentage.toFixed(0)}%
        </span>
      </div>

      <button onClick={() => dispatch(addToCart(product))}>
        Add to cart
      </button>

      <Link to={`/product/${product.id}`}>Details</Link>
    </div>
  );
}