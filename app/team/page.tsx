import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import CTA from "@/components/CTA";
import Photo from "@/components/Photo";
import Reveal, { RevealGroup, RevealItem } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Our Team",
  description:
    "Meet the advocates of Shrimal & Associates - a focused litigation team appearing across Indian courts and tribunals.",
};

// Set `image` to a path under /public (e.g. "/images/team/founder.webp") to show a real portrait.
const team = [
  {
    name: "Sunita Shrimal",
    role: "Founder",
    initials: "SS",
    image: "/images/team/sunita-shrimal.webp",
  },
  {
    name: "Aakshat Khetarpal",
    role: "Counsel",
    office: "Delhi Office",
    initials: "AK",
    image: "/images/team/aakshat-khetarpal.webp",
    portraitClassName: "object-top scale-[2] origin-[50%_0%]",
  },
  {
    name: "Samridhi Prakash",
    role: "Counsel",
    office: "Gurugram Office",
    initials: "SP",
    image: "/images/team/samridhi-prakash.webp",
    portraitClassName: "object-top",
  },
  {
    name: "Siddhanth Kumar",
    role: "Counsel",
    office: "Prayagraj Office",
    initials: "SK",
    image: "/images/team/siddhanth-kumar.webp",
    portraitClassName: "object-top scale-[1.9] origin-[50%_32%]",
  },
];

export default function TeamPage() {
  const [founder, ...counsel] = team;

  return (
    <>
      <PageHero
        eyebrow="Our Team"
        title="The advocates behind your matter"
        intro="A focused team that knows your file. You will always know who is handling your matter - and be able to reach them."
      />

      <section className="mx-auto w-full max-w-[1440px] px-5 py-20 sm:px-8 lg:px-10 lg:py-28" aria-label="Founder and counsel">
        <Reveal>
          <article className="flex flex-col overflow-hidden rounded-md border border-navy/8 bg-white shadow-card md:h-[390px] md:flex-row">
            <div className="relative flex shrink-0 items-center justify-center overflow-hidden bg-navy md:h-full md:w-[34%]">
              {founder.image ? (
                <>
                  <div aria-hidden="true" className="absolute inset-0 hidden md:block">
                    <Photo
                      src={founder.image}
                      alt=""
                      fill
                      sizes="34vw"
                      className="scale-110 object-[50%_53%] blur-md"
                    />
                  </div>
                  <Photo
                    src={founder.image}
                    alt={`Portrait of ${founder.name}`}
                    width={1024}
                    height={1536}
                    sizes="(max-width: 767px) 100vw, 34vw"
                    className="relative h-auto w-full md:h-full md:scale-[0.96] md:object-cover md:object-[50%_53%]"
                  />
                </>
              ) : (
                <>
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 opacity-[0.08]"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(90deg,#B08D45 0,#B08D45 2px,transparent 2px,transparent 40px)",
                    }}
                  />
                  <span className="relative font-serif text-7xl text-gold">
                    {founder.initials}
                  </span>
                </>
              )}
            </div>
            <div className="flex min-w-0 flex-1 flex-col justify-center p-8 sm:p-10 lg:p-14">
              <p className="inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-brand text-gold before:h-px before:w-8 before:bg-gold/60 sm:text-base">Meet our founder</p>
              <h2 className="mt-4 font-serif text-4xl font-semibold text-navy sm:text-5xl lg:text-6xl">
                {founder.name}
              </h2>
              <p className="mt-4 text-lg font-semibold tracking-wide text-gold sm:text-xl">
                {founder.role}
              </p>
              <p className="mt-2 text-base text-slate sm:text-lg">Jaipur Office</p>
              <div aria-hidden="true" className="mt-6 h-px w-12 bg-gold" />
            </div>
          </article>
        </Reveal>

        <h2 className="mb-6 mt-12 text-xs font-semibold uppercase tracking-brand text-slate">
          Our counsel
        </h2>
        <RevealGroup className="grid gap-8 lg:grid-cols-3">
          {counsel.map((member) => (
            <RevealItem key={member.name} className="mx-auto h-full w-full max-w-sm lg:max-w-none">
              <article className="flex h-[240px] overflow-hidden rounded-md border border-navy/8 bg-white shadow-card transition-all duration-500 ease-brand hover:-translate-y-1 hover:shadow-card-hover">
                <div className="relative flex h-full w-[45%] shrink-0 items-center justify-center overflow-hidden bg-navy">
                  {member.image ? (
                    <Photo
                      src={member.image}
                      alt={`Portrait of ${member.name}`}
                      fill
                      sizes="(max-width: 1023px) 90vw, 30vw"
                      className={member.portraitClassName}
                    />
                  ) : (
                    <span className="font-serif text-4xl text-gold">
                      {member.initials}
                    </span>
                  )}
                </div>
                <div className="flex min-w-0 flex-1 flex-col justify-center p-5">
                  <h3 className="flex min-h-[56px] items-center font-serif text-xl text-navy">{member.name}</h3>
                  <p className="mt-3 text-sm font-semibold text-gold">{member.role}</p>
                  <p className="mt-1 text-sm text-slate">{member.office}</p>
                </div>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      <CTA heading="Have a matter for our team?" />
    </>
  );
}
