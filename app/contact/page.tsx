import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";
import OfficeAccordion from "@/components/OfficeAccordion";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Shrimal & Associates. Call, email, or send us a message about your matter - we offer confidential consultations.",
};

export default function ContactPage() {
  const { contact } = site;


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
                Reach the office nearest to you, or send us a message.
              </p>

              <div className="mt-7">
                <h3 className="mb-2 text-xs font-semibold uppercase tracking-brand text-slate-light">Our offices</h3>
                <OfficeAccordion kind="combined" />
              </div>
              <div className="mt-6 space-y-4">
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-brand text-slate-light">Email</h3>
                  <a href={`mailto:${contact.email}`} className="mt-1 block break-words text-navy transition-colors hover:text-gold">{contact.email}</a>
                </div>
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-brand text-slate-light">Hours</h3>
                  <p className="mt-1 text-sm text-slate">{contact.hours}</p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Form */}
          <div className="lg:col-span-7 lg:self-start">
            <ContactForm />
          </div>
        </div>
      </section>


    </>
  );
}
