import { createClient } from "@supabase/supabase-js";

//const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
//const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

const supabaseUrl = "https://ezxdcahdnapqsdpgvpbb.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV6eGRjYWhkbmFwcXNkcGd2cGJiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTA4ODc4NDgsImV4cCI6MjAwNjQ2Mzg0OH0.OcumzS99H5dcZhmXV9yU6kqD8bvS4RuRUIhjja0MAG4";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
