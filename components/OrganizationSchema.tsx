import { offices, practiceAreas, site } from "@/lib/site";

/**
 * LegalService (an Organization subtype) structured data for the homepage.
 * Values are pulled from lib/site.ts - update contact details there.
 */
export default function OrganizationSchema() {
  const base = site.url.replace(/\/$/, "");

  const schema = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    "@id": `${base}/#organization`,
    name: site.name,
    alternateName: site.legalLine,
    slogan: site.brandLine,
    url: base,
    description: site.description,
    telephone: site.contact.phoneDisplay,
    email: site.contact.email,
    image: `${base}/images/emblem.webp`,
    logo: `${base}/images/emblem.webp`,
    priceRange: "₹₹",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.contact.addressLines.slice(0, -1).join(", "),
      addressLocality: "Jaipur",
      addressRegion: "Rajasthan",
      postalCode: "302015",
      addressCountry: "IN",
    },
    location: offices.map((office) => ({
      "@type": "Place",
      name: office.name,
      address: office.address,
      hasMap: office.mapsUrl,
      telephone: office.phones.map((phone) => phone.href),
    })),
    areaServed: { "@type": "Country", name: "India" },
    knowsAbout: practiceAreas.map((a) => a.title),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Practice Areas",
      itemListElement: practiceAreas.map((a) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: a.title,
          description: a.short,
          url: `${base}/practice-areas/${a.slug}`,
        },
      })),
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "10:00",
      closes: "21:00",
    },
    sameAs: Object.values(site.social).filter((url) => url && url !== "#"),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
