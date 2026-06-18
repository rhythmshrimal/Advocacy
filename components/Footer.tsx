import Link from "next/link";
import Logo from "./Logo";
import { nav, practiceAreas, site } from "@/lib/site";

export default function Footer() {
  const year = 2026; // build-time constant; update annually

  return (
    <footer className="bg-navy-900 text-offwhite/80">
      <div className="container-px grid gap-12 py-16 md:grid-cols-12 md:py-20">
        {/* Brand */}
        <div className="md:col-span-4">
          <Logo tone="light" />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-offwhite/65">
            {site.description}
          </p>
          <p className="mt-6 font-serif text-lg italic text-gold-light">
            {site.brandLine}
          </p>
        </div>

        {/* Navigate */}
        <div className="md:col-span-2">
          <h4 className="text-xs font-semibold uppercase tracking-brand text-offwhite/50">
            Navigate
          </h4>
          <ul className="mt-5 space-y-3 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-offwhite/75 transition-colors hover:text-gold"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Practice */}
        <div className="md:col-span-3">
          <h4 className="text-xs font-semibold uppercase tracking-brand text-offwhite/50">
            Practice Areas
          </h4>
          <ul className="mt-5 space-y-3 text-sm">
            {practiceAreas.map((area) => (
              <li key={area.slug}>
                <Link
                  href={`/practice-areas/${area.slug}`}
                  className="text-offwhite/75 transition-colors hover:text-gold"
                >
                  {area.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="md:col-span-3">
          <h4 className="text-xs font-semibold uppercase tracking-brand text-offwhite/50">
            Get in Touch
          </h4>
          <address className="mt-5 space-y-4 text-sm not-italic">
            <a
              href={site.contact.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-offwhite/75 transition-colors hover:text-gold"
            >
              {site.contact.addressLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </a>
            <a
              href={`tel:${site.contact.phoneHref}`}
              className="block text-offwhite/75 transition-colors hover:text-gold"
            >
              {site.contact.phoneDisplay}
            </a>
            <a
              href={`mailto:${site.contact.email}`}
              className="block text-offwhite/75 transition-colors hover:text-gold"
            >
              {site.contact.email}
            </a>
            <p className="text-offwhite/55">{site.contact.hours}</p>
          </address>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-px flex flex-col items-center justify-between gap-3 py-6 text-xs text-offwhite/50 sm:flex-row">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <p className="text-center sm:text-right">
            As per Bar Council of India rules, this website is for informational
            purposes only and does not constitute solicitation or advertisement.
          </p>
        </div>
      </div>
    </footer>
  );
}
