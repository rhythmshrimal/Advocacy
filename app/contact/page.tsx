import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Shrimal & Associates. Call, email, or send us a message about your matter - we offer confidential consultations.",
};

function DetailRow({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4">
      <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-gold/12 text-gold">
        {icon}
      </span>
      <div>
        <p className="text-xs font-semibold uppercase tracking-brand text-slate-light">
          {label}
        </p>
        <div className="mt-1 text-charcoal">{children}</div>
      </div>
    </div>
  );
}

export default function ContactPage() {
  const { contact } = site;
  const mapsEmbed = `https://www.google.com/maps?q=${encodeURIComponent(
    contact.mapsEmbedQuery
  )}&output=embed`;

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's discuss your matter"
        intro="Reach out for a confidential, no-obligation consultation. For urgent matters, calling us is the fastest way to get a response."
      />

      <section className="container-px py-20 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Details */}
          <div className="lg:col-span-5">
            <Reveal>
              <h2 className="font-serif text-2xl font-semibold text-navy">
                Get in touch
              </h2>
              <p className="mt-3 leading-relaxed text-slate">
                Our office is open {site.contact.hours}. Use the form, or contact
                us directly using the details below.
              </p>

              <div className="mt-9 space-y-7">
                <DetailRow
                  label="Office"
                  icon={
                    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                      <path d="M12 21s7-5.7 7-11a7 7 0 1 0-14 0c0 5.3 7 11 7 11Z" stroke="currentColor" strokeWidth="1.6" />
                      <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.6" />
                    </svg>
                  }
                >
                  <a
                    href={contact.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="not-italic transition-colors hover:text-gold"
                  >
                    {contact.addressLines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                    <span className="mt-1 inline-block text-sm font-medium text-gold">
                      View on Google Maps →
                    </span>
                  </a>
                </DetailRow>

                <DetailRow
                  label="Phone"
                  icon={
                    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                      <path d="M2.5 5.5C2.5 4 3.7 2.8 5.2 2.8h1.8c.6 0 1.1.4 1.3 1l.9 3.1c.1.5 0 1-.4 1.4L8.4 9.6a13 13 0 0 0 6 6l1.3-1.4c.4-.4.9-.5 1.4-.4l3.1.9c.6.2 1 .7 1 1.3v1.8c0 1.5-1.2 2.7-2.7 2.7C11.2 20.5 3.5 12.8 2.5 5.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                    </svg>
                  }
                >
                  <a
                    href={`tel:${contact.phoneHref}`}
                    className="transition-colors hover:text-gold"
                  >
                    {contact.phoneDisplay}
                  </a>
                  <a
                    href={`tel:${contact.phone2Href}`}
                    className="block transition-colors hover:text-gold"
                  >
                    {contact.phone2Display}
                  </a>
                </DetailRow>

                <DetailRow
                  label="Email"
                  icon={
                    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
                      <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.6" />
                    </svg>
                  }
                >
                  <a
                    href={`mailto:${contact.email}`}
                    className="transition-colors hover:text-gold"
                  >
                    {contact.email}
                  </a>
                </DetailRow>

                <DetailRow
                  label="Hours"
                  icon={
                    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
                      <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                    </svg>
                  }
                >
                  {contact.hours}
                </DetailRow>
              </div>
            </Reveal>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <Reveal from="right">
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Map */}
      <section aria-label="Office location map" className="border-t border-navy/8">
        <iframe
          title="Shrimal & Associates office location"
          src={mapsEmbed}
          className="h-[420px] w-full grayscale-[20%]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>
    </>
  );
}
