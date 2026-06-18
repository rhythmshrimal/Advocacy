"use client";

import { useState, type FormEvent } from "react";

type FieldErrors = Partial<Record<"name" | "email" | "phone" | "message", string>>;
type Status = "idle" | "submitting" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+]?[\d\s\-()]{7,15}$/;

function validate(values: {
  name: string;
  email: string;
  phone: string;
  message: string;
}): FieldErrors {
  const errors: FieldErrors = {};
  if (!values.name.trim()) errors.name = "Please enter your name.";
  if (!values.phone.trim()) {
    errors.phone = "A phone number is required so we can reach you.";
  } else if (!PHONE_RE.test(values.phone.trim())) {
    errors.phone = "Please enter a valid phone number.";
  }
  if (values.email.trim() && !EMAIL_RE.test(values.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }
  if (!values.message.trim()) {
    errors.message = "Please tell us briefly about your matter.";
  }
  return errors;
}

const fieldBase =
  "w-full rounded-sm border bg-white px-4 py-3 text-charcoal placeholder:text-slate-light/70 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gold/40";

export default function ContactForm() {
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverMsg, setServerMsg] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setServerMsg("");
    const form = e.currentTarget;
    const data = new FormData(form);
    const values = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      phone: String(data.get("phone") ?? ""),
      message: String(data.get("message") ?? ""),
      // Honeypot field - should stay empty for real users
      company: String(data.get("company") ?? ""),
    };

    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const payload = await res.json().catch(() => ({}));

      if (!res.ok) {
        setStatus("error");
        setServerMsg(
          payload?.error ??
            "Something went wrong sending your message. Please call us instead."
        );
        return;
      }
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setServerMsg(
        "We couldn't reach the server. Please check your connection or call us."
      );
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="flex flex-col items-center rounded-md border border-gold/30 bg-white p-10 text-center shadow-card"
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gold/15 text-gold">
          <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7">
            <path
              d="M20 6 9 17l-5-5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <h3 className="mt-5 font-serif text-2xl text-navy">Message received</h3>
        <p className="mt-3 max-w-sm text-slate">
          Thank you for reaching out. A member of our team will respond to your
          enquiry shortly. For urgent matters, please call us directly.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 link-underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-md border border-navy/8 bg-white p-7 shadow-card sm:p-9"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        {/* Name */}
        <div className="sm:col-span-1">
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-navy">
            Name <span className="text-gold">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Your full name"
            aria-invalid={!!errors.name}
            className={`${fieldBase} ${errors.name ? "border-red-400" : "border-navy/15"}`}
          />
          {errors.name && (
            <p className="mt-1.5 text-sm text-red-600">{errors.name}</p>
          )}
        </div>

        {/* Phone */}
        <div className="sm:col-span-1">
          <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-navy">
            Phone <span className="text-gold">*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="Your phone number"
            aria-invalid={!!errors.phone}
            className={`${fieldBase} ${errors.phone ? "border-red-400" : "border-navy/15"}`}
          />
          {errors.phone && (
            <p className="mt-1.5 text-sm text-red-600">{errors.phone}</p>
          )}
        </div>

        {/* Email */}
        <div className="sm:col-span-2">
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-navy">
            Email <span className="text-slate-light">(optional)</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="Your email address"
            aria-invalid={!!errors.email}
            className={`${fieldBase} ${errors.email ? "border-red-400" : "border-navy/15"}`}
          />
          {errors.email && (
            <p className="mt-1.5 text-sm text-red-600">{errors.email}</p>
          )}
        </div>

        {/* Message */}
        <div className="sm:col-span-2">
          <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-navy">
            How can we help? <span className="text-gold">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            placeholder="Briefly describe your matter. Please do not share sensitive case details until we have established representation."
            aria-invalid={!!errors.message}
            className={`${fieldBase} resize-y ${errors.message ? "border-red-400" : "border-navy/15"}`}
          />
          {errors.message && (
            <p className="mt-1.5 text-sm text-red-600">{errors.message}</p>
          )}
        </div>

        {/* Honeypot - hidden from real users */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="company">Company</label>
          <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
        </div>
      </div>

      {status === "error" && (
        <p
          role="alert"
          className="mt-5 rounded-sm border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {serverMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="btn-gold mt-6 w-full disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "submitting" ? (
          <>
            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.25" />
              <path d="M22 12a10 10 0 0 1-10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            </svg>
            Sending…
          </>
        ) : (
          "Send Message"
        )}
      </button>

      <p className="mt-4 text-xs leading-relaxed text-slate">
        By submitting this form you consent to being contacted regarding your
        enquiry. This does not create an attorney–client relationship.
      </p>
    </form>
  );
}
