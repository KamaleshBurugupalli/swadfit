import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://adrrakjuvksymijbgexm.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_8pFEic6ZBvAxdcGmjEPj7g_VjIWk_iL';

export const supabase = createClient(supabaseUrl, supabaseKey);
