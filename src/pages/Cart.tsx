import {
  useAppSelector,
  useAppDispatch,
} from "../app/hooks";
import {
  increaseQty,
  decreaseQty,
} from "../features/cart/cartSlice";

export default function Cart() {
  const { items } = useAppSelector(s => s.cart);
  const dispatch = useAppDispatch();

  const total = items.reduce((acc, i) => {
    const discounted =
      i.price - (i.price * i.discountPercentage) / 100;

    return acc + discounted * i.quantity;
  }, 0);

  return (
    <div className="cart">
      <h2>🛒 Cart</h2>

      {items.map(i => {
        const discounted =
          i.price - (i.price * i.discountPercentage) / 100;

        return (
          <div className="cart-card" key={i.id}>
            <img src={i.thumbnail} />

            <div className="cart-info">
              <p>{i.title}</p>

              <div className="price-block">
                <span className="old-price">{i.price}$</span>
                <span className="new-price">
                  {discounted.toFixed(2)}$
                </span>
              </div>

              <div className="qty">
                <button
                  onClick={() => dispatch(decreaseQty(i.id))}
                >
                  -
                </button>

                <span>{i.quantity}</span>

                <button
                  onClick={() => dispatch(increaseQty(i.id))}
                >
                  +
                </button>
              </div>
            </div>

            <div className="cart-price">
              {(discounted * i.quantity).toFixed(2)}$
            </div>
          </div>
        );
      })}

      <h2 className="total">Total: {total.toFixed(2)}$</h2>
    </div>
  );
}