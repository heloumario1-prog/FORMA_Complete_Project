export default function Footer() {
  return (
    <footer className="container">
      <div>
        <a className="logo" href="#">
          FORMA<span>®</span>
        </a>
        <p>Considered objects. Everyday living.</p>
      </div>
      <nav aria-label="Footer navigation">
        <a href="#shop">Shop</a>
        <a href="#collections">Collections</a>
        <a href="#about">About</a>
      </nav>
      <div className="footer-bottom">
        <span>© 2026 FORMA · Week 4 React project</span>
        <span>
          Educational demo. Products, ratings and checkout are simulated.
        </span>
      </div>
    </footer>
  );
}
