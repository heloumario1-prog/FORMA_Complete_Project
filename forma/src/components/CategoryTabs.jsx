import { categories } from "../data/products.js";
export default function CategoryTabs({ category, onCategory }) {
  return (
    <div className="tabs" role="group" aria-label="Product categories">
      {categories.map((c) => (
        <button
          key={c}
          aria-pressed={category === c}
          className={category === c ? "active" : ""}
          onClick={() => onCategory(c)}
        >
          {c}
        </button>
      ))}
    </div>
  );
}
