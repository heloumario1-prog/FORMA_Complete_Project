import { Heart, Plus, Star } from "lucide-react";
import Img from "./Img.jsx";
import { money } from "../utils/currency.js";
export default function ProductCard({
  product: p,
  isFav,
  inCart,
  onFav,
  onAdd,
  onOpen,
}) {
  return (
    <article className="product-card">
      <div className="product-photo">
        <button
          className="photo-button"
          onClick={() => onOpen(p.id)}
          aria-label={"View " + p.name}
        >
          <Img src={p.image} alt={p.name} />
        </button>
        {(p.badge || p.originalPrice || !p.stock) && (
          <span className="product-badge">
            {!p.stock
              ? "Sold out"
              : p.originalPrice
                ? "The good-price edit"
                : p.badge}
          </span>
        )}
        <button
          className={"heart " + (isFav ? "selected" : "")}
          aria-label={(isFav ? "Remove " : "Save ") + p.name + " favorite"}
          aria-pressed={isFav}
          onClick={() => onFav(p.id)}
        >
          <Heart size={18} fill={isFav ? "currentColor" : "none"} />
        </button>
      </div>
      <div className="product-info">
        <p className="eyebrow">{p.category}</p>
        <button className="product-name" onClick={() => onOpen(p.id)}>
          {p.name}
        </button>
        <div className="rating">
          <Star size={12} fill="currentColor" /> {p.rating}{" "}
          <span>({p.reviews} sample reviews)</span>
        </div>
        <div className="product-bottom">
          <span>
            {money(p.price)}{" "}
            {p.originalPrice && <del>{money(p.originalPrice)}</del>}
          </span>
          <button
            className="add-button"
            disabled={inCart >= p.stock}
            onClick={() => onAdd(p.id, 1)}
            aria-label={"Add " + p.name + " to cart"}
          >
            {inCart >= p.stock ? (
              p.stock ? (
                "Limit reached"
              ) : (
                "Sold out"
              )
            ) : (
              <>
                <Plus size={16} /> Add
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
