export const money = (cents) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
    cents / 100,
  );
export const shippingFor = (subtotal) =>
  subtotal === 0 || subtotal >= 10000 ? 0 : 599;
