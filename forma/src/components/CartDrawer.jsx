import { useState } from "react";
import { Trash2, ShoppingBag } from "lucide-react";
import Dialog from "./Dialog.jsx";
import Img from "./Img.jsx";
import Quantity from "./Quantity.jsx";
import OrderSummary from "./OrderSummary.jsx";
import { findProduct } from "../data/products.js";
import { money } from "../utils/currency.js";
export default function CartDrawer({
  cart,
  totals,
  onQty,
  onRemove,
  onClear,
  onCheckout,
  onClose,
}) {
  const [confirm, setConfirm] = useState(false);
  return (
    <Dialog title="Your bag" drawer onClose={onClose}>
      {cart.length ? (
        <>
          <p className="shipping-note">
            {totals.subtotal >= 10000
              ? "Your order qualifies for free demo shipping."
              : money(10000 - totals.subtotal) +
                " away from free demo shipping."}
          </p>
          <progress
            value={Math.min(totals.subtotal, 10000)}
            max="10000"
            aria-label="Progress toward free shipping"
          />
          <div className="cart-items">
            {cart.map((i) => {
              const p = findProduct(i.id);
              return (
                <div className="cart-item" key={i.id}>
                  <Img src={p.image} alt={p.name} />
                  <div>
                    <h3>{p.name}</h3>
                    <p>{money(p.price)} each</p>
                    <Quantity
                      value={i.qty}
                      max={p.stock}
                      onChange={(n) => onQty(i.id, n)}
                      label={"quantity of " + p.name}
                    />
                    <strong>{money(p.price * i.qty)}</strong>
                  </div>
                  <button
                    aria-label={"Remove " + p.name}
                    onClick={() => onRemove(i.id)}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              );
            })}
          </div>
          {confirm ? (
            <div
              className="clear-confirm"
              role="group"
              aria-label="Confirm clear cart"
            >
              <p>Remove everything from your bag?</p>
              <button
                className="secondary"
                onClick={() => {
                  onClear();
                  setConfirm(false);
                }}
              >
                Yes, clear bag
              </button>
              <button onClick={() => setConfirm(false)}>Keep items</button>
            </div>
          ) : (
            <button className="text-button" onClick={() => setConfirm(true)}>
              Clear bag
            </button>
          )}
          <OrderSummary totals={totals} />
          <button className="primary full" onClick={onCheckout}>
            Continue to demo checkout
          </button>
          <p className="muted">
            No payment required. No real order will be placed.
          </p>
          <button className="secondary full" onClick={onClose}>
            Continue shopping
          </button>
        </>
      ) : (
        <div className="empty">
          <ShoppingBag size={40} />
          <h3>A little room for something good.</h3>
          <p>Your bag is currently empty.</p>
          <p>Subtotal $0.00 · Shipping $0.00 · Total $0.00</p>
          <button className="primary" onClick={onClose}>
            Continue shopping
          </button>
        </div>
      )}
    </Dialog>
  );
}
