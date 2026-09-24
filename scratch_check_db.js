import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config();

if (typeof globalThis.WebSocket === "undefined") {
  globalThis.WebSocket = class WebSocket {};
}

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function check() {
  const { data: users, error: err1 } = await supabase.auth.admin.listUsers();
  if (err1) console.error("Error fetching auth users:", err1);

  const { data: profiles, error: err2 } = await supabase.from("profiles").select("*");
  if (err2) console.error("Error fetching profiles:", err2);

  console.log("Auth Users Count:", users?.users?.length);
  console.log("Profiles Count:", profiles?.length);

  const userIds = new Set(users?.users?.map((u) => u.id));
  const profileIds = new Set(profiles?.map((p) => p.id));

  const missingInProfiles = [...userIds].filter((id) => !profileIds.has(id));
  console.log("Users missing in profiles:", missingInProfiles);
}

check();
