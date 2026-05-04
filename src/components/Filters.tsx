interface Props {
  setSort: (value: string) => void;
  setSearch: (value: string) => void;
  setOrder: (value: "asc" | "desc") => void;
  order: "asc" | "desc";
}

export default function Filters({
  setSort,
  setSearch,
  setOrder,
  order,
}: Props) {
  return (
    <div className="filters">
      <input
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search products..."
      />

      <select onChange={(e) => setSort(e.target.value)}>
        <option value="title">Alphabet</option>
        <option value="price">Price</option>
        <option value="discount">Discount</option>
      </select>

      {/* кнопка направления сортировки */}
      <button
        onClick={() => setOrder(order === "asc" ? "desc" : "asc")}
        className="sort-btn"
      >
        {order === "asc" ? "⬆️" : "⬇️"}
      </button>
    </div>
  );
}