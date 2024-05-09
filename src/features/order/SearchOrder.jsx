import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchOrder() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    if (!query) return;
    navigate(`/order/${query}`);
    setQuery("");
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="search order #"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="bg-yellow-100 focus:ring-opacity-50 px-4 py-2 rounded-full w-28 sm:w-64 sm:focus:w-72 text-sm placeholder:text-stone-400 transition-all duration-300 focus:outline-none focus:ring focus:ring-yellow-500"
      />
    </form>
  );
}

export default SearchOrder;
