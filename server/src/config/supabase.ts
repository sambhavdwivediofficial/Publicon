import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { env } from './env';
import { Database } from '../types/database.types';

let supabaseInstance: SupabaseClient<Database> | null = null;

export const getSupabase = (): SupabaseClient<Database> => {
  if (!supabaseInstance) {
    supabaseInstance = createClient<Database>(
      env.SUPABASE_URL,
      env.SUPABASE_SERVICE_ROLE_KEY,
      {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        },
        db: {
          schema: 'public',
        },
      }
    );
  }
  return supabaseInstance;
};