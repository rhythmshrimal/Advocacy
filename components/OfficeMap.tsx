"use client";

import { useId, useState } from "react";
import { offices } from "@/lib/site";

export default function OfficeMap() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const office = offices[selectedIndex];
  const id = useId();

  return (
    <section aria-labelledby={`${id}-heading`} className="border-t border-white/10">
      <div className="mx-auto w-full max-w-[1440px] px-5 py-12 sm:px-8 lg:px-10">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <h2 id={`${id}-heading`} className="font-serif text-2xl text-offwhite">Our offices</h2>
          <div role="group" aria-label="Choose an office map" className="flex flex-wrap gap-x-6 gap-y-2">
            {offices.map((item, index) => (
              <button
                key={item.name}
                type="button"
                aria-pressed={selectedIndex === index}
                aria-controls={`${id}-map`}
                onClick={() => setSelectedIndex(index)}
                className={`min-h-11 border-b-2 py-2 text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold ${selectedIndex === index ? "border-gold text-gold-light" : "border-transparent text-offwhite/70 hover:text-gold-light"}`}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
        <div className="my-6 flex flex-wrap items-start justify-between gap-5" aria-live="polite" aria-atomic="true">
          <address className="max-w-2xl text-sm not-italic leading-relaxed text-offwhite/75">
            <span className="mb-1 block font-medium text-offwhite">{office.name}</span>
            {office.address}
            <a href={office.mapsUrl} target="_blank" rel="noopener noreferrer" className="mt-2 block text-gold-light hover:underline">View on Google Maps →</a>
          </address>
          <div className="text-sm">
            <p className="mb-2 text-xs uppercase tracking-brand text-offwhite/50">Phone</p>
            {office.phones.map((phone) => (
              <a key={phone.href} href={`tel:${phone.href}`} className="mt-1 block text-offwhite transition-colors hover:text-gold-light">{phone.display}</a>
            ))}
          </div>
        </div>
        <iframe
          id={`${id}-map`}
          title={`${office.name} location map`}
          src={`https://www.google.com/maps?q=${encodeURIComponent(office.address)}&output=embed`}
          className="h-[320px] w-full rounded-xs border-0 sm:h-[400px]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  );
}
