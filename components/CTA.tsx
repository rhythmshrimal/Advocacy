import Link from "next/link";
import Reveal from "./Reveal";
import { site } from "@/lib/site";

type CTAProps = {
  heading?: string;
  body?: string;
};

export default function CTA({
  heading = "Facing a legal challenge? Let's talk.",
  body = "A confidential, no-obligation consultation is the first step. Tell us about your matter and we will advise you candidly on where you stand and what comes next.",
}: CTAProps) {
  return (
    <section className="relative overflow-hidden bg-navy">
      {/* subtle gold glow */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-gold/5 blur-3xl" />

      <div className="container-px relative py-20 lg:py-24">
        <Reveal className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <span className="eyebrow mb-5">{site.brandLine}</span>
          <h2 className="font-serif text-3xl font-semibold leading-tight text-offwhite sm:text-4xl lg:text-[2.75rem]">
            {heading}
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-offwhite/70 sm:text-lg">
            {body}
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href="/contact" className="btn-gold">
              Request a Consultation
            </Link>
            <a
              href={`tel:${site.contact.phoneHref}`}
              className="btn-ghost-light"
            >
              Call {site.contact.phoneDisplay}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
