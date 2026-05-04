interface Props {
  total: number;
  limit: number;
  setPage: (page: number) => void;
}

export default function Pagination({ total, limit, setPage }: Props) {
  const pages = Math.ceil(total / limit);

  return (
    <div className="pagination">
      {Array.from({ length: pages }).map((_, i) => (
        <button key={i} onClick={() => setPage(i)}>
          {i + 1}
        </button>
      ))}
    </div>
  );
}