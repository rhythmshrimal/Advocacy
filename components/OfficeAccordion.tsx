"use client";

import { useId, useState } from "react";
import { offices } from "@/lib/site";

export default function OfficeAccordion({
  kind,
  dark = false,
  showMap = false,
}: {
  kind: "office" | "phone" | "combined";
  dark?: boolean;
  showMap?: boolean;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(kind === "combined" ? 0 : null);
  const id = useId();

  return (
    <div
      className={`w-full min-w-0 border-t ${dark ? "border-white/15" : "border-navy/15"}`}
      aria-label={kind === "phone" ? "Office phone numbers" : "Office contact details"}
    >
      {offices.map((office, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={office.name} className={`border-b ${dark ? "border-white/15" : "border-navy/15"}`}>
            <h3>
              <button
                id={`${id}-button-${index}`}
                type="button"
                aria-expanded={isOpen}
                aria-controls={`${id}-panel-${index}`}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className={`group flex min-h-14 w-full items-center justify-between gap-4 py-3 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${
                  isOpen ? dark ? "text-gold-light" : "text-gold" : dark ? "text-offwhite/85 hover:text-gold-light" : "text-navy hover:text-gold"
                }`}
              >
                <span className="font-serif text-xl">{office.name}</span>
                <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className={`h-5 w-5 shrink-0 ${dark ? "text-gold-light" : "text-gold"}`}>
                  <path d="M4 10h12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                  <path d="M10 4v12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" className={`origin-center transition-transform duration-200 motion-reduce:transition-none ${isOpen ? "scale-y-0" : "scale-y-100"}`} />
                </svg>
              </button>
            </h3>
            <div
              id={`${id}-panel-${index}`}
              role="region"
              aria-labelledby={`${id}-button-${index}`}
              hidden={!isOpen}
              className={`pb-6 text-sm ${dark ? "text-offwhite/75" : "text-slate"}`}
            >
              <div className="border-l border-gold/40 pl-4">
                {kind !== "phone" ? (
                  <>
                    <address className="not-italic leading-relaxed">{office.address}</address>
                    {kind === "combined" && (
                      <div className="mt-3 space-y-1">
                        {office.phones.map((phone) => (
                          <a key={phone.href} href={`tel:${phone.href}`} className="block text-base text-navy transition-colors hover:text-gold">{phone.display}</a>
                        ))}
                      </div>
                    )}
                    <a href={office.mapsUrl} target="_blank" rel="noopener noreferrer" className={`mt-3 inline-block font-medium hover:underline ${dark ? "text-gold-light" : "text-gold"}`}>
                      View on Google Maps →
                    </a>
                  </>
                ) : (
                  <div className="space-y-2">
                    {office.phones.map((phone) => (
                      <a key={phone.href} href={`tel:${phone.href}`} className={`block text-base transition-colors ${dark ? "text-offwhite hover:text-gold-light" : "text-navy hover:text-gold"}`}>{phone.display}</a>
                    ))}
                  </div>
                )}
              </div>
              {kind === "office" && showMap && isOpen && (
                <iframe
                  title={`${office.name} location map`}
                  src={`https://www.google.com/maps?q=${encodeURIComponent(office.address)}&output=embed`}
                  className="mt-5 h-56 w-full rounded-xs border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
