import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center bg-navy-900">
      <div className="container-px text-center">
        <p className="eyebrow justify-center">Page not found</p>
        <h1 className="mt-5 font-serif text-6xl font-semibold text-offwhite sm:text-7xl">
          404
        </h1>
        <p className="mx-auto mt-5 max-w-md text-offwhite/70">
          The page you are looking for doesn&apos;t exist or may have moved.
          Let&apos;s get you back on track.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/" className="btn-gold">
            Back to Home
          </Link>
          <Link href="/contact" className="btn-ghost-light">
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
