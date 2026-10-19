import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

type ContactPayload = {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  company?: string; // honeypot
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+]?[\d\s\-()]{7,15}$/;

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(request: Request) {
  let body: ContactPayload;
  try {
    const raw = await request.text();
    if (new TextEncoder().encode(raw).length > 16_384) {
      return NextResponse.json({ error: "Request is too large." }, { status: 413 });
    }
    body = JSON.parse(raw) as ContactPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (
    !body || typeof body !== "object" || Array.isArray(body) ||
    [body.name, body.email, body.phone, body.message, body.company].some(
      (value) => value !== undefined && typeof value !== "string"
    )
  ) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const phone = (body.phone ?? "").trim();
  const message = (body.message ?? "").trim();

  // Honeypot - silently accept bots without sending mail
  if ((body.company ?? "").trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  // Server-side validation (mirrors client)
  if (!name) {
    return NextResponse.json({ error: "Name is required." }, { status: 400 });
  }
  if (!phone || !PHONE_RE.test(phone)) {
    return NextResponse.json(
      { error: "A valid phone number is required." },
      { status: 400 }
    );
  }
  if (email && !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Please provide a valid email address." },
      { status: 400 }
    );
  }
  if (!message) {
    return NextResponse.json({ error: "Message is required." }, { status: 400 });
  }

  if (name.length > 150 || email.length > 254 || message.length > 5000) {
    return NextResponse.json({ error: "Please shorten your name, email, or message." }, { status: 400 });
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS, SMTP_FROM, CONTACT_TO } =
    process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !CONTACT_TO) {
    // Misconfiguration - log server-side, return a graceful message
    console.error("[contact] SMTP environment variables are not configured.");
    return NextResponse.json(
      {
        error:
          "The contact form is not fully configured yet. Please email or call us directly in the meantime.",
      },
      { status: 503 }
    );
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT ?? 465),
    secure: String(SMTP_SECURE ?? "true") === "true",
    auth: { user: SMTP_USER, pass: SMTP_PASS },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000,
    disableFileAccess: true,
    disableUrlAccess: true,
  });

  const safe = {
    name: escapeHtml(name),
    email: email ? escapeHtml(email) : "-",
    phone: escapeHtml(phone),
    message: escapeHtml(message).replace(/\n/g, "<br/>"),
  };

  const html = `
    <div style="font-family:Inter,Arial,sans-serif;color:#1A1A1A;max-width:560px">
      <h2 style="color:#0E2A47;border-bottom:2px solid #B08D45;padding-bottom:8px">
        New website enquiry
      </h2>
      <table style="width:100%;border-collapse:collapse;font-size:14px">
        <tr><td style="padding:6px 0;color:#5C6470;width:120px">Name</td><td><strong>${safe.name}</strong></td></tr>
        <tr><td style="padding:6px 0;color:#5C6470">Phone</td><td>${safe.phone}</td></tr>
        <tr><td style="padding:6px 0;color:#5C6470">Email</td><td>${safe.email}</td></tr>
      </table>
      <p style="margin-top:16px;color:#5C6470;font-size:14px">Message</p>
      <div style="background:#F8F6F2;border-left:3px solid #B08D45;padding:14px 16px;font-size:15px;line-height:1.6">
        ${safe.message}
      </div>
      <p style="margin-top:24px;color:#8A909A;font-size:12px">
        Sent from the Shrimal &amp; Associates website contact form.
      </p>
    </div>`;

  const text = `New website enquiry\n\nName: ${name}\nPhone: ${phone}\nEmail: ${email || "-"}\n\nMessage:\n${message}`;

  try {
    await transporter.sendMail({
      from: SMTP_FROM ?? SMTP_USER,
      to: CONTACT_TO,
      replyTo: email || undefined,
      subject: `New enquiry from ${name}`,
      text,
      html,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] Failed to send email:", err);
    return NextResponse.json(
      {
        error:
          "We couldn't send your message right now. Please call or email us directly.",
      },
      { status: 502 }
    );
  }
}
