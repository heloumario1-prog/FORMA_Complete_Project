import ProductCard from "./ProductCard.jsx";
export default function ProductGrid({
  products,
  favs,
  cart,
  onFav,
  onAdd,
  onReset,
  onOpen,
}) {
  return products.length ? (
    <div className="product-grid">
      {products.map((p) => (
        <ProductCard
          key={p.id}
          product={p}
          isFav={favs.includes(p.id)}
          inCart={cart.find((i) => i.id === p.id)?.qty || 0}
          {...{ onFav, onAdd, onOpen }}
        />
      ))}
    </div>
  ) : (
    <div className="empty">
      <h3>Nothing here just yet.</h3>
      <p>Try a different search, or discover the full collection.</p>
      <button className="primary" onClick={onReset}>
        Explore all products
      </button>
    </div>
  );
}
