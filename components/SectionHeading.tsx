import type { ReactNode } from "react";
import Reveal from "./Reveal";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  tone = "dark",
  className = "",
}: SectionHeadingProps) {
  const alignment = align === "center" ? "items-center text-center mx-auto" : "items-start text-left";
  const titleColor = tone === "light" ? "text-offwhite" : "text-navy";
  const introColor = tone === "light" ? "text-offwhite/70" : "text-slate";

  return (
    <Reveal
      className={`flex max-w-2xl flex-col ${alignment} ${className}`}
    >
      {eyebrow && <span className="eyebrow mb-4">{eyebrow}</span>}
      <h2
        className={`font-serif text-3xl font-semibold leading-tight sm:text-4xl lg:text-[2.6rem] ${titleColor}`}
      >
        {title}
      </h2>
      {intro && (
        <p className={`mt-5 text-base leading-relaxed sm:text-lg ${introColor}`}>
          {intro}
        </p>
      )}
    </Reveal>
  );
}
