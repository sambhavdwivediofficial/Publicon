import { getSupabase } from '../config/supabase';
import { Database } from '../types/database.types';

type User = Database['public']['Tables']['users']['Row'];

export class UserRepository {
  static async upsertUser(userData: Database['public']['Tables']['users']['Insert']) {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('users')
      .upsert(userData, { onConflict: 'email' })
      .select('*')
      .single();
    if (error) throw error;
    return data as User;
  }

  static async findByEmail(email: string) {
    const supabase = getSupabase();
    const { data } = await supabase.from('users').select('*').eq('email', email).single();
    return data as User | null;
  }

  static async findById(id: string) {
    const supabase = getSupabase();
    const { data } = await supabase.from('users').select('*').eq('id', id).single();
    return data as User | null;
  }

  static async findByUsername(username: string) {
    const supabase = getSupabase();
    const { data } = await supabase.from('users').select('*').eq('username', username).single();
    return data as User | null;
  }

  static async update(id: string, updates: any) {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('users')
      .update(updates as any)
      .eq('id', id)
      .select('*')
      .single();
    if (error) throw error;
    return data as User;
  }
}