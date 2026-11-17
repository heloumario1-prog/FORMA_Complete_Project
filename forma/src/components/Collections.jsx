import { ArrowUpRight } from "lucide-react";
import { categories, products } from "../data/products.js";
import Img from "./Img.jsx";
export default function Collections({ onPick }) {
  return (
    <section className="container section" id="collections">
      <div className="section-heading">
        <div>
          <p className="eyebrow">FIND YOUR EVERYDAY</p>
          <h2>A place for everything.</h2>
        </div>
        <p>Small upgrades. A better daily rhythm.</p>
      </div>
      <div className="collections">
        {categories.slice(1).map((c, i) => (
          <button className="collection" key={c} onClick={() => onPick(c)}>
            <div>
              <Img
                src={products.find((p) => p.category === c).image}
                alt={c + " collection"}
              />
            </div>
            <span>
              {c}
              <ArrowUpRight size={18} />
            </span>
            <small>Explore the collection</small>
          </button>
        ))}
      </div>
    </section>
  );
}
