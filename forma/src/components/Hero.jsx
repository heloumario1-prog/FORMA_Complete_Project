import { ArrowUpRight, ArrowRight } from "lucide-react";
import Img from "./Img.jsx";
export default function Hero({ onShop }) {
  return (
    <section className="hero container">
      <div className="hero-copy">
        <p className="eyebrow">THE EVERYDAY, WELL CONSIDERED</p>
        <h1>
          Good things.
          <br />
          <em>Everyday.</em>
        </h1>
        <p className="hero-description">
          Objects with purpose. Details that matter.
          <br />
          Thoughtfully selected essentials for the way you live.
        </p>
        <button className="primary" onClick={onShop}>
          Shop the collection <ArrowUpRight size={19} />
        </button>
        <div className="hero-note">
          <span className="note-line" />
          Thoughtful design. Everyday utility.
        </div>
      </div>
      <div className="hero-visual">
        <Img
          src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1400&q=85"
          alt="A bright, considered workspace with natural textures"
        />
        <div className="hero-label">
          <span>ROOM FOR THE LITTLE THINGS</span>
          <button onClick={onShop} aria-label="Explore everyday essentials">
            <ArrowRight />
          </button>
        </div>
        <span className="edition">THE FORMA EDIT / 01</span>
      </div>
    </section>
  );
}
