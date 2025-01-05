import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://hepxxxerirnntwgxtdwi.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhlcHh4eGVyaXJubnR3Z3h0ZHdpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMwMzkzMzIsImV4cCI6MjA0ODYxNTMzMn0.WdfXlnHYnncAuAi95mdW7yjObSbibWAMYMEqVkqzVPk";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
