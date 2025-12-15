const Pagination = ({ page, totalPages, setPage }) => {
  if (!totalPages || totalPages <= 1) return null;

  return (
    <div className="flex justify-center gap-2 mt-6">
      <button
        disabled={page === 1}
        onClick={() => setPage((p) => p - 1)}
        className="btn btn-xs btn-outline"
      >
        Prev
      </button>

      <span className="text-sm text-gray-400 flex items-center">
        Page {page} of {totalPages}
      </span>

      <button
        disabled={page === totalPages}
        onClick={() => setPage((p) => p + 1)}
        className="btn btn-xs btn-outline"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
