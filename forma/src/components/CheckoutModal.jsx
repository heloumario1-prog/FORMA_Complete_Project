import { useState, useRef } from "react";
import { CheckCircle } from "lucide-react";
import Dialog from "./Dialog.jsx";
import OrderSummary from "./OrderSummary.jsx";
import { findProduct } from "../data/products.js";
import { money } from "../utils/currency.js";
const fields = [
  ["name", "Full name", "name"],
  ["email", "Email address", "email"],
  ["address", "Street address", "street-address"],
  ["city", "City", "address-level2"],
  ["country", "Country", "country-name"],
];
export default function CheckoutModal({
  cart,
  totals,
  order,
  onSubmit,
  onBack,
  onClose,
}) {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const form = useRef();
  function submit(e) {
    e.preventDefault();
    const next = {};
    fields.forEach(([key, label]) => {
      if (!values[key]?.trim()) next[key] = label + " is required.";
    });
    if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
      next.email = "Enter a valid email address.";
    setErrors(next);
    if (Object.keys(next).length) {
      setTimeout(
        () => form.current?.querySelector('[aria-invalid="true"]')?.focus(),
        0,
      );
      return;
    }
    onSubmit();
    setValues({});
  }
  return (
    <Dialog
      title={order ? "Your demo order is complete" : "Demo checkout"}
      onClose={onClose}
    >
      {order ? (
        <div className="confirmation">
          <CheckCircle size={46} />
          <p className="eyebrow">THANK YOU FOR EXPLORING FORMA</p>
          <h3>A good little collection.</h3>
          <p>
            Reference: <strong>{order.ref}</strong>
          </p>
          <p>No real order was placed and no payment was processed.</p>
          <ul>
            {order.items.map((i) => (
              <li key={i.id}>
                {i.qty} × {i.name}
                <strong>{money(i.price * i.qty)}</strong>
              </li>
            ))}
          </ul>
          <p>
            Total: <strong>{money(order.total)}</strong>
          </p>
          <button className="primary" onClick={onClose}>
            Continue exploring
          </button>
        </div>
      ) : (
        <div className="checkout">
          <p className="demo-notice">
            Frontend demonstration only. Your details stay in this open form and
            are never sent or saved. No payment information is required.
          </p>
          <div className="checkout-layout">
            <form ref={form} noValidate onSubmit={submit}>
              <h3>Your details</h3>
              {fields.map(([key, label, auto]) => (
                <div className="field" key={key}>
                  <label htmlFor={key}>
                    {label} <span aria-hidden="true">*</span>
                  </label>
                  <input
                    id={key}
                    name={key}
                    autoComplete={auto}
                    type={key === "email" ? "email" : "text"}
                    required
                    value={values[key] || ""}
                    onChange={(e) =>
                      setValues((v) => ({ ...v, [key]: e.target.value }))
                    }
                    aria-invalid={!!errors[key]}
                    aria-describedby={errors[key] ? key + "-error" : undefined}
                  />
                  {errors[key] && (
                    <span id={key + "-error"} className="error">
                      {errors[key]}
                    </span>
                  )}
                </div>
              ))}
              <button
                className="primary full"
                type="submit"
                disabled={!cart.length}
              >
                Place demo order
              </button>
              <button className="secondary full" type="button" onClick={onBack}>
                Back to bag
              </button>
            </form>
            <aside>
              <h3>Order summary</h3>
              {cart.map((i) => (
                <p className="summary-item" key={i.id}>
                  <span>
                    {i.qty} × {findProduct(i.id).name}
                  </span>
                  <strong>{money(findProduct(i.id).price * i.qty)}</strong>
                </p>
              ))}
              <OrderSummary totals={totals} />
            </aside>
          </div>
        </div>
      )}
    </Dialog>
  );
}
