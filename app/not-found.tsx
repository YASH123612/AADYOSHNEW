import Link from "next/link";

export default function NotFound() {
  return (
    <section className="page-hero">
      <div className="container">
        <h1>That page <span className="highlight">doesn&apos;t exist.</span></h1>
        <p className="lead">The link may be old or mistyped. Browse our programs or head back to the homepage.</p>
        <div className="cta-actions">
          <Link href="/#programs" className="btn btn-primary"><i className="fa-solid fa-layer-group"></i> Explore programs</Link>{" "}
          <Link href="/" className="btn btn-outline">Back to home</Link>
        </div>
      </div>
    </section>
  );
}
