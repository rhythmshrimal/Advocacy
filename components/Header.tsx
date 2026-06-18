"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import Logo from "./Logo";
import { nav, site } from "@/lib/site";

function PhoneIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M2.5 5.5C2.5 4 3.7 2.8 5.2 2.8h1.8c.6 0 1.1.4 1.3 1l.9 3.1c.1.5 0 1-.4 1.4L8.4 9.6a13 13 0 0 0 6 6l1.3-1.4c.4-.4.9-.5 1.4-.4l3.1.9c.6.2 1 .7 1 1.3v1.8c0 1.5-1.2 2.7-2.7 2.7C11.2 20.5 3.5 12.8 2.5 5.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll while mobile menu open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-brand ${
        solid
          ? "bg-navy/95 shadow-header backdrop-blur-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container-px flex h-[72px] items-center justify-between md:h-20">
        <Logo tone="light" />

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {nav.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative text-sm font-medium tracking-wide transition-colors duration-300 ${
                  active ? "text-gold" : "text-offwhite/85 hover:text-gold"
                }`}
              >
                {item.label}
                {active && (
                  <span className="absolute -bottom-1.5 left-0 h-px w-full bg-gold" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          {/* Phone CTA — always visible for clients in urgent situations */}
          <a
            href={`tel:${site.contact.phoneHref}`}
            className="hidden items-center gap-2 rounded-sm border border-gold/60 px-4 py-2.5 text-sm font-semibold text-gold transition-colors duration-300 hover:bg-gold hover:text-white sm:inline-flex"
          >
            <PhoneIcon className="h-4 w-4" />
            <span>{site.contact.phoneDisplay}</span>
          </a>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="relative z-50 flex h-11 w-11 flex-col items-center justify-center gap-[5px] rounded-sm text-offwhite lg:hidden"
          >
            <span
              className={`block h-0.5 w-6 bg-current transition-transform duration-300 ${
                open ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-current transition-opacity duration-300 ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-current transition-transform duration-300 ${
                open ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      <AnimatePresence>
        {open && (
          <motion.nav
            key="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-white/10 bg-navy lg:hidden"
            aria-label="Mobile"
          >
            <ul className="container-px flex flex-col py-4">
              {nav.map((item) => {
                const active =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`block border-b border-white/5 py-3.5 text-base font-medium ${
                        active ? "text-gold" : "text-offwhite/90"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
              <li className="pt-4">
                <a href={`tel:${site.contact.phoneHref}`} className="btn-gold w-full">
                  <PhoneIcon className="h-4 w-4" />
                  Call {site.contact.phoneDisplay}
                </a>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
