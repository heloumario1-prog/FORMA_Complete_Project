import { useState } from "react";
import { Search, Heart, ShoppingBag, Menu, X } from "lucide-react";
export default function Header({
  query,
  onQuery,
  favCount,
  cartCount,
  favsOnly,
  onFavs,
  onCart,
  onNav,
}) {
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(false);
  return (
    <>
      <div className="announcement">
        A little more considered. A little more everyday.{" "}
        <span>Free demo shipping on $100+</span>
      </div>
      <header>
        <div className="header-inner">
          <a className="logo" href="#" aria-label="FORMA home">
            FORMA<span>®</span>
          </a>
          <nav
            aria-label="Main navigation"
            className={menu ? "nav open" : "nav"}
          >
            {["Shop", "Collections", "About"].map((n) => (
              <a
                key={n}
                href={"#" + n.toLowerCase()}
                onClick={() => setMenu(false)}
              >
                {n}
              </a>
            ))}
          </nav>
          <div className="header-actions">
            <button
              aria-label="Search products"
              aria-expanded={search}
              onClick={() => {
                setSearch(!search);
                if (!search)
                  setTimeout(
                    () => document.getElementById("search")?.focus(),
                    0,
                  );
              }}
            >
              <Search size={20} />
            </button>
            <button
              aria-label={"Favorites, " + favCount + " items"}
              aria-pressed={favsOnly}
              onClick={onFavs}
            >
              <Heart size={20} fill={favsOnly ? "currentColor" : "none"} />
              <span className="badge">{favCount}</span>
            </button>
            <button
              aria-label={"Open cart, " + cartCount + " items"}
              onClick={onCart}
            >
              <ShoppingBag size={20} />
              <span className="badge">{cartCount}</span>
            </button>
            <button
              className="mobile-menu"
              aria-label={menu ? "Close navigation" : "Open navigation"}
              aria-expanded={menu}
              onClick={() => setMenu(!menu)}
            >
              {menu ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {search && (
          <div className="search-row">
            <label htmlFor="search">Find your everyday essential</label>
            <input
              id="search"
              type="search"
              value={query}
              placeholder="Search products, materials, categories…"
              onChange={(e) => {
                onQuery(e.target.value);
                onNav("shop", true);
              }}
            />
          </div>
        )}
      </header>
    </>
  );
}
