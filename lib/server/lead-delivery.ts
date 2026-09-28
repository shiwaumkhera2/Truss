import nodemailer from "nodemailer";
import type { LeadFields } from "@/lib/lead";
import { site } from "@/content/site";

export type Lead = LeadFields & {
  submittedAt: string;
  source?: string;
  userAgent?: string;
  ip?: string;
};

export type DeliveryResult = {
  /** True when at least one delivery channel is configured. */
  configured: boolean;
  /** Channels that were attempted and succeeded. */
  delivered: string[];
  /** Channels that were attempted and failed, with the reason. */
  failed: { channel: string; reason: string }[];
};

/**
 * Where every lead goes once it has passed validation and the honeypot.
 *
 * Every lead is always logged to the server console (visible in Vercel's function logs).
 * Email delivery uses the first of these that is configured:
 *
 *   1. Gmail SMTP   GMAIL_USER + GMAIL_APP_PASSWORD
 *                   Sends from the Gmail account to LEAD_TO_EMAIL using an App Password
 *                   (Google Account > Security > 2-Step Verification > App passwords).
 *   2. Resend       RESEND_API_KEY (+ optional LEAD_FROM_EMAIL)
 *                   Sends through Resend's REST API. Without a verified domain, Resend only
 *                   delivers to the address the Resend account was created with.
 *
 * LEAD_TO_EMAIL sets the recipient and defaults to the site's contact email
 * (TrussHQ@gmail.com from content/site.ts).
 *
 * LEAD_WEBHOOK_URL, when set, additionally POSTs the lead as JSON (Zapier, Make, Slack, a CRM).
 */
export async function deliverLead(lead: Lead): Promise<DeliveryResult> {
  console.log("[lead]", JSON.stringify(lead));

  const to = process.env.LEAD_TO_EMAIL?.trim() || site.contactEmail;
  const result: DeliveryResult = { configured: false, delivered: [], failed: [] };
  const tasks: { channel: string; run: () => Promise<void> }[] = [];

  const gmailUser = process.env.GMAIL_USER?.trim();
  const gmailPassword = process.env.GMAIL_APP_PASSWORD?.replace(/\s+/g, "");
  const resendKey = process.env.RESEND_API_KEY?.trim();

  if (gmailUser && gmailPassword) {
    tasks.push({ channel: "gmail", run: () => sendWithGmail(lead, { user: gmailUser, password: gmailPassword, to }) });
  } else if (resendKey) {
    tasks.push({ channel: "resend", run: () => sendWithResend(lead, { apiKey: resendKey, to }) });
  }

  const webhook = process.env.LEAD_WEBHOOK_URL?.trim();
  if (webhook) {
    tasks.push({ channel: "webhook", run: () => postWebhook(lead, webhook) });
  }

  result.configured = tasks.length > 0;
  if (!result.configured) {
    if (process.env.NODE_ENV === "production") {
      console.warn("[lead] No delivery channel configured. Set GMAIL_USER + GMAIL_APP_PASSWORD (or RESEND_API_KEY) so leads reach", to);
    }
    return result;
  }

  const outcomes = await Promise.allSettled(tasks.map((task) => task.run()));
  outcomes.forEach((outcome, i) => {
    const { channel } = tasks[i];
    if (outcome.status === "fulfilled") {
      result.delivered.push(channel);
      console.log(`[lead] delivered via ${channel} to ${to}`);
    } else {
      const reason = outcome.reason instanceof Error ? outcome.reason.message : String(outcome.reason);
      result.failed.push({ channel, reason });
      console.error(`[lead] ${channel} delivery failed:`, reason);
    }
  });

  return result;
}

function subjectFor(lead: Lead) {
  return `New Truss lead: ${lead.name} at ${lead.company}`;
}

function textFor(lead: Lead) {
  return [
    `Name: ${lead.name}`,
    `Email: ${lead.email}`,
    `Phone: ${lead.phone}`,
    `Company: ${lead.company}`,
    "",
    `Submitted: ${lead.submittedAt}`,
    lead.source ? `Source: ${lead.source}` : null,
    lead.ip ? `IP: ${lead.ip}` : null,
    lead.userAgent ? `Browser: ${lead.userAgent}` : null,
  ]
    .filter((line) => line !== null)
    .join("\n");
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string);
}

function htmlFor(lead: Lead) {
  const row = (label: string, value: string) =>
    `<tr><td style="padding:6px 16px 6px 0;color:#6b7a90;font:14px system-ui,sans-serif">${label}</td><td style="padding:6px 0;color:#0a0f1a;font:14px system-ui,sans-serif">${escapeHtml(value)}</td></tr>`;
  return `<div style="font:16px system-ui,sans-serif;color:#0a0f1a">
    <p style="margin:0 0 16px">New walkthrough request from the Truss website.</p>
    <table cellpadding="0" cellspacing="0">
      ${row("Name", lead.name)}
      ${row("Email", lead.email)}
      ${row("Phone", lead.phone)}
      ${row("Company", lead.company)}
      ${row("Submitted", lead.submittedAt)}
      ${lead.source ? row("Source", lead.source) : ""}
    </table>
  </div>`;
}

async function sendWithGmail(lead: Lead, opts: { user: string; password: string; to: string }) {
  const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user: opts.user, pass: opts.password },
  });
  await transport.sendMail({
    from: `"Truss website" <${opts.user}>`,
    to: opts.to,
    replyTo: lead.email,
    subject: subjectFor(lead),
    text: textFor(lead),
    html: htmlFor(lead),
  });
}

async function sendWithResend(lead: Lead, opts: { apiKey: string; to: string }) {
  const from = process.env.LEAD_FROM_EMAIL?.trim() || "Truss website <onboarding@resend.dev>";
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${opts.apiKey}`, "content-type": "application/json" },
    body: JSON.stringify({
      from,
      to: [opts.to],
      reply_to: lead.email,
      subject: subjectFor(lead),
      text: textFor(lead),
      html: htmlFor(lead),
    }),
  });
  if (!response.ok) {
    throw new Error(`Resend responded ${response.status}: ${(await response.text()).slice(0, 200)}`);
  }
}

async function postWebhook(lead: Lead, url: string) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(lead),
  });
  if (!response.ok) {
    throw new Error(`Webhook responded ${response.status}`);
  }
}
