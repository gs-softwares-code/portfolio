import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import fs from "fs";
import path from "path";

// --- Zod schema ---
const ContactSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters").max(100),
  businessName: z.string().min(2, "Business name must be at least 2 characters").max(200),
  email: z.string().email("Invalid email address").max(254),
  phone: z.string().max(30).optional().nullable().transform((v) => v || null),
  industry: z.enum([
    "hospitality",
    "beauty-wellness",
    "legal-professional",
    "retail-commerce",
    "growing-business",
    "other",
  ]),
  service: z.enum([
    "ai-agents",
    "automation",
    "website",
    "app-dev",
    "custom-software",
    "infrastructure",
    "other",
  ]),
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

// --- Contacts file path ---
const DATA_DIR = path.join(process.cwd(), "data");
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
    industry: data.industry,
    service: data.service,
    description: data.description,
    meta: { ip },
  };

  // Atomic append
  try {
    const contacts = readContacts();
    contacts.push(record);
    writeContacts(contacts);
  } catch (err) {
    console.error("Failed to write contact:", err);
    return NextResponse.json(
      { success: false, message: "Internal server error. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { success: true, id: submissionId, message: "Inquiry received successfully." },
    { status: 200 }
  );
}
