import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import CTA from "@/components/CTA";
import { RevealGroup, RevealItem } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Our Team",
  description:
    "Meet the advocates of Shrimal & Associates — a focused litigation team appearing across Indian courts and tribunals.",
};

// [PLACEHOLDER] Replace names, roles, bios, and photos with real team details.
const team = [
  {
    name: "Adv. [Founder Name]",
    role: "Founder & Managing Advocate",
    focus: "Criminal Law · PMLA · Civil Litigation",
    bio: "Leads the firm's litigation practice with extensive courtroom experience across trial and appellate forums. Known for meticulous preparation and a calm, strategic presence in court.",
    initials: "SA",
  },
  {
    name: "Adv. [Associate Name]",
    role: "Senior Associate",
    focus: "Matrimonial & Family Law · Service Law",
    bio: "Handles sensitive matrimonial and service matters with a client-first approach, combining empathy for clients in distress with firm, effective advocacy.",
    initials: "AS",
  },
  {
    name: "Adv. [Associate Name]",
    role: "Associate",
    focus: "Litigation Support · Drafting · Research",
    bio: "Supports the firm's matters through rigorous legal research, drafting, and case preparation, ensuring every brief is built on a sound factual and legal foundation.",
    initials: "AS",
  },
];

export default function TeamPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Team"
        title="The advocates behind your matter"
        intro="A focused team that knows your file. You will always know who is handling your matter — and be able to reach them."
      />

      <section className="container-px py-20 lg:py-28">
        <RevealGroup className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {team.map((member) => (
            <RevealItem key={member.name}>
              <article className="group h-full overflow-hidden rounded-md border border-navy/8 bg-white shadow-card transition-all duration-500 ease-brand hover:-translate-y-1 hover:shadow-card-hover">
                {/* Portrait placeholder — replace with real photography */}
                <div className="relative flex aspect-[4/3] items-center justify-center bg-navy">
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 opacity-[0.08]"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(90deg,#B08D45 0,#B08D45 2px,transparent 2px,transparent 40px)",
                    }}
                  />
                  <span className="font-serif text-5xl text-gold">
                    {member.initials}
                  </span>
                </div>
                <div className="p-7">
                  <h2 className="font-serif text-xl text-navy">{member.name}</h2>
                  <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-gold">
                    {member.role}
                  </p>
                  <p className="mt-2 text-xs uppercase tracking-wide text-slate-light">
                    {member.focus}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-slate">
                    {member.bio}
                  </p>
                </div>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>

        <p className="mt-12 max-w-2xl text-sm leading-relaxed text-slate-light">
          Team details and photographs shown above are placeholders. Replace the
          names, roles, biographies, and portraits in{" "}
          <code className="rounded bg-navy/5 px-1.5 py-0.5 text-navy">app/team/page.tsx</code>{" "}
          with your real team information.
        </p>
      </section>

      <CTA heading="Have a matter for our team?" />
    </>
  );
}
