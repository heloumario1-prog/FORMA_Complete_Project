import { useMemo, useState, useCallback } from "react";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import Collections from "./components/Collections.jsx";
import ProductToolbar from "./components/ProductToolbar.jsx";
import ProductGrid from "./components/ProductGrid.jsx";
import ProductQuickView from "./components/ProductQuickView.jsx";
import CartDrawer from "./components/CartDrawer.jsx";
import CheckoutModal from "./components/CheckoutModal.jsx";
import Footer from "./components/Footer.jsx";
import { useToast } from "./components/ToastProvider.jsx";
import { useLocalStorage } from "./hooks/useLocalStorage.js";
import { products, findProduct } from "./data/products.js";
import { shippingFor } from "./utils/currency.js";

// Drop anything malformed, unknown, or out of stock; clamp quantities to stock.
const cleanCart = (raw) => {
  if (!Array.isArray(raw)) return [];
  const seen = new Set(),
    out = [];
  for (const i of raw) {
    const p = i && findProduct(i.id);
    if (
      !p ||
      seen.has(i.id) ||
      !Number.isInteger(i.qty) ||
      i.qty < 1 ||
      p.stock < 1
    )
      continue;
    seen.add(i.id);
    out.push({ id: i.id, qty: Math.min(i.qty, p.stock) });
  }
  return out;
};
const cleanFavs = (raw) =>
  Array.isArray(raw) ? [...new Set(raw.filter((id) => !!findProduct(id)))] : [];

export default function App() {
  const toast = useToast();
  const [cart, setCart] = useLocalStorage("forma-cart", [], cleanCart);
  const [favs, setFavs] = useLocalStorage("forma-favs", [], cleanFavs);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [favsOnly, setFavsOnly] = useState(false);
  const [sort, setSort] = useState("featured");
  const [overlay, setOverlay] = useState(null); // null | 'cart' | 'quick' | 'checkout' (one at a time)
  const [quickId, setQuickId] = useState(null);
  const [order, setOrder] = useState(null);

  const scrollTo = (id, instant) =>
    document
      .getElementById(id)
      ?.scrollIntoView({
        behavior:
          window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
          instant
            ? "auto"
            : "smooth",
        block: "start",
      });

  // Everything below is derived from state, not stored.
  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = products.filter(
      (p) =>
        (category === "All" || p.category === category) &&
        (!favsOnly || favs.includes(p.id)) &&
        (!q || `${p.name} ${p.desc} ${p.category}`.toLowerCase().includes(q)),
    );
    if (sort === "low") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "high") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "rated")
      list = [...list].sort(
        (a, b) => b.rating - a.rating || b.reviews - a.reviews,
      );
    return list;
  }, [query, category, favsOnly, sort, favs]);
  const cartCount = cart.reduce((n, i) => n + i.qty, 0);
  const subtotal = cart.reduce(
    (s, i) => s + findProduct(i.id).price * i.qty,
    0,
  );
  const totals = {
    subtotal,
    shipping: shippingFor(subtotal),
    total: subtotal + shippingFor(subtotal),
  };

  const addToCart = (id, n) => {
    const p = findProduct(id);
    const have = cart.find((i) => i.id === id)?.qty || 0;
    const add = Math.min(n, p.stock - have);
    if (add < 1) {
      toast(`No more ${p.name} available`);
      return;
    }
    setCart((c) =>
      c.some((i) => i.id === id)
        ? c.map((i) =>
            i.id === id ? { ...i, qty: Math.min(p.stock, i.qty + add) } : i,
          )
        : [...c, { id, qty: Math.min(add, p.stock) }],
    );
    toast(`${p.name} added to cart`);
  };
  const setQty = (id, qty) =>
    setCart((c) =>
      c.map((i) =>
        i.id === id
          ? { ...i, qty: Math.max(1, Math.min(qty, findProduct(id).stock)) }
          : i,
      ),
    );
  const removeItem = (id) => {
    setCart((c) => c.filter((i) => i.id !== id));
    toast(`${findProduct(id).name} removed`);
  };
  const toggleFav = (id) => {
    const on = favs.includes(id);
    setFavs((f) => (on ? f.filter((x) => x !== id) : [...f, id]));
    toast(
      `${findProduct(id).name} ${on ? "removed from" : "added to"} favorites`,
    );
  };
  const resetFilters = () => {
    setQuery("");
    setCategory("All");
    setFavsOnly(false);
    setSort("featured");
  };
  const close = useCallback(() => setOverlay(null), []);
  const closeCheckout = useCallback(() => {
    setOverlay(null);
    setOrder(null);
  }, []);
  const placeOrder = () => {
    const items = cart.map(({ id, qty }) => ({ ...findProduct(id), qty }));
    setOrder({
      ref: `DEMO-${Date.now().toString(36).toUpperCase()}`,
      items,
      total: totals.total,
    });
    setCart([]);
  };
  const quick = quickId && findProduct(quickId);

  return (
    <>
      <div>
        <a
          className="skip"
          href="#shop"
          onClick={(e) => {
            e.preventDefault();
            scrollTo("shop");
          }}
        >
          Skip to products
        </a>
        <Header
          query={query}
          onQuery={setQuery}
          favCount={favs.length}
          cartCount={cartCount}
          favsOnly={favsOnly}
          onFavs={() => {
            setFavsOnly((f) => !f);
            scrollTo("shop");
          }}
          onCart={() => setOverlay("cart")}
          onNav={scrollTo}
        />
        <main>
          <Hero onShop={() => scrollTo("shop")} />
          <Collections
            onPick={(c) => {
              setCategory(c);
              scrollTo("shop");
            }}
          />
          <section
            className="container section"
            id="shop"
            aria-labelledby="shop-h"
          >
            <h2 id="shop-h">Shop</h2>
            <ProductToolbar
              category={category}
              onCategory={setCategory}
              sort={sort}
              onSort={setSort}
              favsOnly={favsOnly}
              onFavsOnly={setFavsOnly}
              query={query.trim()}
              count={visible.length}
              onReset={resetFilters}
            />
            <ProductGrid
              products={visible}
              favs={favs}
              cart={cart}
              onFav={toggleFav}
              onAdd={addToCart}
              onReset={resetFilters}
              onOpen={(id) => {
                setQuickId(id);
                setOverlay("quick");
              }}
            />
          </section>
          <section
            className="container section about"
            id="about"
            aria-labelledby="about-h"
          >
            <h2 id="about-h">About FORMA</h2>
            <p>
              FORMA is a small, imagined shop built on one idea: the things you
              touch every day should work well and look good doing it. We favour
              honest materials, quiet colours and simple shapes over trends.
            </p>
            <p>
              Each product is chosen for how it earns its place on your desk, in
              your bag or beside your bed. Practical first, beautiful because of
              it.
            </p>
          </section>
        </main>
        <Footer onNav={scrollTo} />
      </div>
      {overlay === "quick" && quick && (
        <ProductQuickView
          product={quick}
          isFav={favs.includes(quick.id)}
          inCart={cart.find((i) => i.id === quick.id)?.qty || 0}
          onFav={toggleFav}
          onAdd={addToCart}
          onClose={close}
        />
      )}
      {overlay === "cart" && (
        <CartDrawer
          cart={cart}
          totals={totals}
          onQty={setQty}
          onRemove={removeItem}
          onClear={() => {
            setCart([]);
            toast("Cart cleared");
          }}
          onCheckout={() => setOverlay("checkout")}
          onClose={close}
        />
      )}
      {overlay === "checkout" && (
        <CheckoutModal
          cart={cart}
          totals={totals}
          order={order}
          onSubmit={placeOrder}
          onBack={() => setOverlay("cart")}
          onClose={closeCheckout}
        />
      )}
    </>
  );
}
