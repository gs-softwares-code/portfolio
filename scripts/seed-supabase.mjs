import { createClient } from "@supabase/supabase-js";
import { serviceDivisions } from "./src/data/servicesData.js";
import { industrySolutions } from "./src/data/industriesData.js";
import { allProjects } from "./src/data/projectsData.js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Please set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in your environment.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seed() {
  console.log("Seeding services...");
  const { error: sErr } = await supabase.from("services").upsert(serviceDivisions);
  if (sErr) console.error("Error seeding services:", sErr);
  else console.log("Services seeded successfully.");

  console.log("Seeding solutions...");
  const { error: solErr } = await supabase.from("solutions").upsert(industrySolutions);
  if (solErr) console.error("Error seeding solutions:", solErr);
  else console.log("Solutions seeded successfully.");

  console.log("Seeding projects...");
  const { error: pErr } = await supabase.from("projects").upsert(allProjects);
  if (pErr) console.error("Error seeding projects:", pErr);
  else console.log("Projects seeded successfully.");

  console.log("Done!");
}

seed();
