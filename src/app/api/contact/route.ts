import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import fs from "fs";
import path from "path";
import { Resend } from "resend";
import { getSupabase } from "@/lib/supabase";

// --- Zod schema ---
const ContactSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters").max(100),
  businessName: z.string().min(2, "Business name must be at least 2 characters").max(200),
  email: z.string().email("Invalid email address").max(254),
  phone: z.string().max(30).optional().nullable().transform((v) => v || null),
  country: z.string().optional().nullable().transform((v) => v || null),
  industry: z.string().min(1).default("other"),
  service: z.string().optional().default("other"),
  services: z.array(z.string()).optional(),
  budgetRange: z.string().optional().nullable(),
  preferredContact: z.string().optional().nullable(),
  description: z.string().min(10, "Description must be at least 10 characters").max(5000),
  // honeypot
  website: z.string().optional(),
});

// --- IP rate limiting (in-memory, per process) ---
const rateLimitMap = new Map<string, number[]>();
const WINDOW_MS = 5 * 60 * 1000; // 5 minutes
const MAX_REQUESTS = 3;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (rateLimitMap.get(ip) ?? []).filter(
    (t) => now - t < WINDOW_MS
  );
  if (timestamps.length >= MAX_REQUESTS) {
    rateLimitMap.set(ip, timestamps);
    return true;
  }
  timestamps.push(now);
  rateLimitMap.set(ip, timestamps);
  return false;
}

// --- Contacts file path (Writable /tmp on serverless environments like Vercel) ---
const DATA_DIR = process.env.VERCEL
  ? path.join("/tmp", "data")
  : path.join(process.cwd(), "data");
const CONTACTS_FILE = path.join(DATA_DIR, "contacts.json");

function readContacts(): object[] {
  try {
    if (!fs.existsSync(CONTACTS_FILE)) return [];
    const raw = fs.readFileSync(CONTACTS_FILE, "utf-8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeContacts(contacts: object[]): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  const tmp = CONTACTS_FILE + ".tmp";
  fs.writeFileSync(tmp, JSON.stringify(contacts, null, 2), "utf-8");
  fs.renameSync(tmp, CONTACTS_FILE);
}

// --- Route handler ---
export async function POST(request: NextRequest) {
  // Get client IP
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0].trim() : "unknown";

  // Rate limit check
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { success: false, message: "Too many requests. Please wait a few minutes before trying again." },
      { status: 429 }
    );
  }

  // Parse body
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid request body." },
      { status: 400 }
    );
  }

  // Validate
  const result = ContactSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      {
        success: false,
        message: "Validation failed.",
        errors: result.error.flatten().fieldErrors,
      },
      { status: 400 }
    );
  }

  const data = result.data;

  // Honeypot check
  if (data.website && data.website.trim().length > 0) {
    // Silently reject spam — return 200 to confuse bots
    return NextResponse.json({ success: true, id: "spam_rejected" }, { status: 200 });
  }

  // Generate submission ID
  const submissionId = `inq_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  const timestamp = new Date().toISOString();

  const record = {
    id: submissionId,
    submittedAt: timestamp,
    fullName: data.fullName,
    businessName: data.businessName,
    email: data.email,
    phone: data.phone ?? null,
    country: data.country ?? null,
    industry: data.industry,
    service: data.service,
    services: data.services ?? [data.service],
    budgetRange: data.budgetRange ?? null,
    preferredContact: data.preferredContact ?? null,
    description: data.description,
    meta: { ip },
  };

  // Persistence (local file storage with safe error handling on serverless)
  try {
    const contacts = readContacts();
    contacts.push(record);
    writeContacts(contacts);
  } catch (err) {
    console.warn("Notice: File write skipped on serverless filesystem:", err);
  }

  // Supabase Lead Storage (if connected)
  const supabase = getSupabase();
  if (supabase) {
    try {
      await supabase.from("contact_submissions").insert({
        full_name: data.fullName,
        business_name: data.businessName,
        email: data.email,
        phone: data.phone ?? null,
        country: data.country ?? null,
        industry: data.industry,
        services: data.services ?? [data.service],
        budget_range: data.budgetRange ?? null,
        preferred_contact: data.preferredContact ?? null,
        description: data.description,
        status: "new",
      });
    } catch (dbErr) {
      console.warn("Notice: Supabase lead insert skipped/failed:", dbErr);
    }
  }

  // Send email notification via Resend if API key is provided
  const resendApiKey = process.env.RESEND_API_KEY;
  if (resendApiKey) {
    try {
      const resend = new Resend(resendApiKey);
      const recipientEmail = process.env.CONTACT_NOTIFICATION_EMAIL || "gssoftwares.official@gmail.com";
      const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

      await resend.emails.send({
        from: `GS-Softwares Inquiries <${fromEmail}>`,
        to: recipientEmail,
        replyTo: data.email,
        subject: `New Project Inquiry from ${data.fullName} (${data.businessName})`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #151A23; background-color: #F8FAFC; border-radius: 12px; border: 1px solid #E2E8F0;">
            <div style="border-bottom: 2px solid #3B82F6; padding-bottom: 16px; margin-bottom: 24px;">
              <h2 style="margin: 0; color: #0F172A; font-size: 22px;">New Inquiry Received</h2>
              <p style="margin: 4px 0 0; color: #64748B; font-size: 14px;">Inquiry ID: ${submissionId}</p>
            </div>
            
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; width: 140px; color: #475569;">Full Name:</td>
                <td style="padding: 8px 0; color: #0F172A;">${data.fullName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #475569;">Business Name:</td>
                <td style="padding: 8px 0; color: #0F172A;">${data.businessName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #475569;">Email:</td>
                <td style="padding: 8px 0;"><a href="mailto:${data.email}" style="color: #2563EB;">${data.email}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #475569;">Phone:</td>
                <td style="padding: 8px 0; color: #0F172A;">${data.phone || "Not provided"}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #475569;">Industry:</td>
                <td style="padding: 8px 0; color: #0F172A;">${data.industry}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #475569;">Requested Service:</td>
                <td style="padding: 8px 0; color: #0F172A; font-weight: 600;">${data.service}</td>
              </tr>
            </table>

            <div style="background-color: #FFFFFF; padding: 16px; border-radius: 8px; border: 1px solid #CBD5E1; margin-bottom: 24px;">
              <p style="margin: 0 0 8px; font-weight: bold; color: #334155;">Project Description:</p>
              <p style="margin: 0; white-space: pre-wrap; line-height: 1.6; color: #1E293B;">${data.description}</p>
            </div>

            <div style="font-size: 12px; color: #94A3B8; text-align: center; border-top: 1px solid #E2E8F0; padding-top: 16px;">
              Sent via GS-Softwares Inquiries Engine &bull; IP: ${ip}
            </div>
          </div>
        `,
      });
    } catch (emailErr) {
      // Log failure but do not break user response since submission was saved
      console.error("Failed to send notification email via Resend:", emailErr);
    }
  }

  return NextResponse.json(
    { success: true, id: submissionId, message: "Inquiry received successfully." },
    { status: 200 }
  );
}
