import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchProductById } from "../features/products/productsAPI";
import type { Product } from "../types/Product";
import { useAppDispatch } from "../app/hooks";
import { addToCart } from "../features/cart/cartSlice";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [product, setProduct] = useState<Product | null>(null);
  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    if (id) fetchProductById(id).then(setProduct);
  }, [id]);

  if (!product) return <p>Loading...</p>;

  const discounted =
    product.price -
    (product.price * product.discountPercentage) / 100;

  return (
    <div className="details-wrapper">
      {/* BACK */}
      <button className="back-btn" onClick={() => navigate("/")}>
        ←
      </button>

      <div className="details-card">
        {/* LEFT SIDE */}
        <div className="details-left">
          <img
            className="main-image"
            src={product.images[activeImg]}
          />

          <div className="thumbs">
            {product.images.slice(0, 5).map((img, i) => (
              <img
                key={i}
                src={img}
                className={i === activeImg ? "active" : ""}
                onClick={() => setActiveImg(i)}
              />
            ))}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="details-right">
          <h1>{product.title}</h1>

          <p className="desc">{product.description}</p>

          <div className="price-block">
            <span className="old-price">{product.price}$</span>
            <span className="new-price">
              {discounted.toFixed(2)}$
            </span>
            <span className="discount">
              -{product.discountPercentage.toFixed(0)}%
            </span>
          </div>

          {/* QUANTITY */}
          <div className="qty">
            <button onClick={() => setQty(q => Math.max(1, q - 1))}>
              -
            </button>
            <span>{qty}</span>
            <button onClick={() => setQty(q => q + 1)}>
              +
            </button>
          </div>

          {/* ADD */}
          <button
            className="add-btn"
            onClick={() => {
              for (let i = 0; i < qty; i++) {
                dispatch(addToCart(product));
              }
            }}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}