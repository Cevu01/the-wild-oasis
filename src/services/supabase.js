import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://rhhodycaonwvqvkfaixj.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJoaG9keWNhb253dnF2a2ZhaXhqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM4MjI3OTAsImV4cCI6MjA0OTM5ODc5MH0.--JteKVVrdIPit0wBZnxXmFgbL83yWHFWYvnlWMVJPA";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
