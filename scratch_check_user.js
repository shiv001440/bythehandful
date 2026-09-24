import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config();

if (typeof globalThis.WebSocket === "undefined") {
  globalThis.WebSocket = class WebSocket {};
}

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function check() {
  const { data: profiles, error: err2 } = await supabase.from("profiles").select("*");
  console.log(profiles);
}

check();
