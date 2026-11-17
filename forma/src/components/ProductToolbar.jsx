import CategoryTabs from "./CategoryTabs.jsx";
export default function ProductToolbar({
  category,
  onCategory,
  sort,
  onSort,
  favsOnly,
  onFavsOnly,
  query,
  count,
  onReset,
}) {
  return (
    <>
      <div className="toolbar">
        <CategoryTabs category={category} onCategory={onCategory} />
        <label className="sort">
          Sort by{" "}
          <select
            value={sort}
            onChange={(e) => onSort(e.target.value)}
            aria-label="Sort products"
          >
            <option value="featured">Featured</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
            <option value="rated">Top Rated</option>
          </select>
        </label>
      </div>
      <div className="filter-meta">
        <p role="status">
          {count} essentials{query && <> matching “{query}”</>}
        </p>
        <label>
          <input
            type="checkbox"
            checked={favsOnly}
            onChange={(e) => onFavsOnly(e.target.checked)}
          />{" "}
          Favorites only
        </label>
        {(category !== "All" || query || favsOnly || sort !== "featured") && (
          <button className="text-button" onClick={onReset}>
            Reset filters
          </button>
        )}
      </div>
    </>
  );
}
