import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://qwbjunbbbqsprilicqxa.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF3Ymp1bmJiYnFzcHJpbGljcXhhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE4MzE5NTEsImV4cCI6MjA3NzQwNzk1MX0.IXZBixSm1qxdQlPbf-VQSDEws_3ThyYS_7F6bumRUGM";

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
