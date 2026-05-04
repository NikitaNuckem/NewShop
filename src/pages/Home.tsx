import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getProducts } from "../features/products/productsSlice";
import ProductCard from "../components/ProductCard";
import Header from "../components/Header";
import Filters from "../components/Filters";

const LIMIT = 12;

export default function Home() {
  const dispatch = useAppDispatch();
  const { items, status } = useAppSelector((s) => s.products);

  const [page, setPage] = useState(0);
  const [sort, setSort] = useState("title");
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const processed = [...items]
    .filter((p) =>
      p.title.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sort === "title") {
        return order === "asc"
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      }

      if (sort === "price") {
        return order === "asc"
          ? a.price - b.price
          : b.price - a.price;
      }

      if (sort === "discount") {
        return order === "asc"
          ? a.discountPercentage - b.discountPercentage
          : b.discountPercentage - a.discountPercentage;
      }

      return 0;
    });

  const paginated = processed.slice(page * LIMIT, page * LIMIT + LIMIT);

  if (status === "loading") return <p>Loading...</p>;

  return (
    <>
      <Header />

      <Filters
        setSort={setSort}
        setSearch={setSearch}
        setOrder={setOrder}
        order={order}
      />

      <div className="grid">
        {paginated.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      <div className="pagination">
        {Array.from({
          length: Math.ceil(processed.length / LIMIT),
        }).map((_, i) => (
          <button key={i} onClick={() => setPage(i)}>
            {i + 1}
          </button>
        ))}
      </div>
    </>
  );
}