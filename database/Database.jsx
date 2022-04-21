import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://jthdffdretrlvsbdcrwb.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp0aGRmZmRyZXRybHZzYmRjcndiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTA0NDkyMjcsImV4cCI6MTk2NjAyNTIyN30.eUkziq0hzMYHp3MNgEU9U_0IAvWYOKr9aEKd4WTRvhU";
export const supabase = createClient(supabaseUrl, supabaseKey);
