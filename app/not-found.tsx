import Link from "next/link";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main" className="s-status">
        <div className="s-container">
          <p className="s-status__code" aria-hidden="true">404</p>
          <h1>Page Not Found</h1>
          <p>The page you’re looking for doesn’t exist or may have been moved.</p>
          <div className="s-status__cta">
            <Link href="/" className="btn btn-primary btn-lg">Back to Home</Link>
            <Link href="/#conference" className="btn btn-outline btn-lg">Explore Conference</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
