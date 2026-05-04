import { Link } from "react-router-dom";
import { useAppSelector } from "../app/hooks";

export default function Header() {
  const { items } = useAppSelector((s) => s.cart);

  return (
    <header className="header">
      <h2>My Shop</h2>

      <Link to="/cart">
        🛒 {items.length}
      </Link>
    </header>
  );
}