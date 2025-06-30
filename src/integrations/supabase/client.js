
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://phuresvmvkmnqjfobjdi.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBodXJlc3ZtdmttbnFqZm9iamRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEyODU3MDMsImV4cCI6MjA2Njg2MTcwM30.-9yHyQIuE4HSulb83XB6Wzh309qH7g5D2bvqa0b8DpE";

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});
