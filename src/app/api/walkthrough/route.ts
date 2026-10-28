import { NextResponse } from "next/server";

type Payload = { name?: string; company?: string; email?: string; revenue?: string };

/**
 * Receives walkthrough requests from the site form.
 * With RESEND_API_KEY and WALKTHROUGH_INBOX set, it emails the request through Resend.
 * Without them, it validates and logs so the form still works in preview environments.
 */
export async function POST(req: Request) {
  let body: Payload;
  try {
    body = (await req.json()) as Payload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const name = body.name?.trim() ?? "";
  const company = body.company?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const revenue = body.revenue?.trim() ?? "";

  if (name.length < 2 || company.length < 2 || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json({ error: "Missing or invalid fields" }, { status: 422 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const inbox = process.env.WALKTHROUGH_INBOX;
  const from = process.env.WALKTHROUGH_FROM ?? "Omni GC <onboarding@resend.dev>";

  if (apiKey && inbox) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [inbox],
        reply_to: email,
        subject: `Walkthrough request: ${company}`,
        text: `Name: ${name}\nCompany: ${company}\nEmail: ${email}\nRevenue: ${revenue || "not given"}`,
      }),
    });
    if (!res.ok) {
      console.error("Resend rejected walkthrough request", res.status, await res.text());
      return NextResponse.json({ error: "Delivery failed" }, { status: 502 });
    }
  } else {
    console.info("Walkthrough request (no mail provider configured)", { name, company, email, revenue });
  }

  return NextResponse.json({ ok: true });
}
