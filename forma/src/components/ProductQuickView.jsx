import { useState } from "react";
import { Heart } from "lucide-react";
import Dialog from "./Dialog.jsx";
import Img from "./Img.jsx";
import Quantity from "./Quantity.jsx";
import { money } from "../utils/currency.js";
export default function ProductQuickView({
  product: p,
  isFav,
  inCart,
  onFav,
  onAdd,
  onClose,
}) {
  const [qty, setQty] = useState(1);
  const available = p.stock - inCart;
  return (
    <Dialog title={p.name} onClose={onClose}>
      <div className="quick-view">
        <Img src={p.image} alt={p.name} />
        <div>
          <p className="eyebrow">{p.category} / THE FORMA COLLECTION</p>
          <h3>{money(p.price)}</h3>
          {p.originalPrice && <del>{money(p.originalPrice)}</del>}
          <p>{p.desc}</p>
          <p>
            ★ {p.rating} · {p.reviews} sample reviews
          </p>
          <p className="stock">
            {p.stock
              ? available + " available to add"
              : "Currently out of stock"}
          </p>
          {available > 0 && (
            <Quantity
              value={Math.min(qty, available)}
              max={available}
              onChange={setQty}
            />
          )}
          <button
            className="primary full"
            disabled={available < 1}
            onClick={() => onAdd(p.id, Math.min(qty, available))}
          >
            {available > 0 ? "Add to bag" : "Unavailable"}
          </button>
          <button
            className="secondary full"
            onClick={() => onFav(p.id)}
            aria-pressed={isFav}
          >
            <Heart size={18} />
            {isFav ? "Saved to favorites" : "Save to favorites"}
          </button>
          <small>
            Educational demo · Product specifications and reviews are sample
            data.
          </small>
        </div>
      </div>
    </Dialog>
  );
}
