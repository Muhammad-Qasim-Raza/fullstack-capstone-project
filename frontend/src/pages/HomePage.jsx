import { Link } from "react-router-dom";
export default function HomePage() {
  return (
    <main className="hero">
      <div>
        <p className="eyebrow">SHARE • REUSE • RECYCLE</p>
        <h1>Give useful things a second life.</h1>
        <p className="hero-text">
          GiftLink connects people who have household items to give away with
          people looking for free, reusable items.
        </p>
        <Link className="button" to="/register">
          Get Started
        </Link>
      </div>
      <div className="hero-panel">
        <div>♻️</div>
        <strong>Less waste.</strong>
        <span>More community.</span>
      </div>
    </main>
  );
}
