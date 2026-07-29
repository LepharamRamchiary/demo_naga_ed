import { Link } from "react-router";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center justify-center bg-paper px-5">
      <div className="text-center">
        <h1 className="font-display text-8xl font-bold text-turmeric">404</h1>

        <h2 className="mt-4 text-3xl font-bold text-ink">Page Not Found</h2>

        <p className="mt-3 text-sm text-smoke">
          Sorry, the page you're looking for doesn't exist.
        </p>

        <Link
          to="/"
          className="mt-8 inline-block rounded-full bg-turmeric px-8 py-3 font-semibold text-paper"
        >
          Back to Home
        </Link>
      </div>
    </section>
  );
}
