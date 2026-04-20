import { getSupabase } from '../config/supabase';
import { Database } from '../types/database.types';

type Media = Database['public']['Tables']['media']['Row'];

export class MediaRepository {
  static async create(data: Database['public']['Tables']['media']['Insert']) {
    const supabase = getSupabase();
    const { data: media, error } = await supabase.from('media').insert(data).select('*').single();
    if (error) throw error;
    return media as Media;
  }

  static async findById(id: string) {
    const supabase = getSupabase();
    const { data, error } = await supabase.from('media').select('*').eq('id', id).single();
    if (error) return null;
    return data as Media;
  }

  static async delete(id: string) {
    const supabase = getSupabase();
    const { error } = await supabase.from('media').delete().eq('id', id);
    if (error) throw error;
    return true;
  }
}