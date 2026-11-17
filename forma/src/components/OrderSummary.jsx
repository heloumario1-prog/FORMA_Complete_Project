import { money } from "../utils/currency.js";
export default function OrderSummary({ totals }) {
  return (
    <div className="totals">
      <p>
        <span>Subtotal</span>
        <span>{money(totals.subtotal)}</span>
      </p>
      <p>
        <span>Shipping</span>
        <span>{totals.shipping ? money(totals.shipping) : "Free"}</span>
      </p>
      <p className="grand-total">
        <span>
          Total <small>USD</small>
        </span>
        <strong>{money(totals.total)}</strong>
      </p>
    </div>
  );
}
