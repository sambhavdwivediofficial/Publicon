import { getSupabase } from '../config/supabase';
import { Database } from '../types/database.types';

type Tag = Database['public']['Tables']['tags']['Row'];

export class TagRepository {
  static async findOrCreate(tagName: string) {
    const supabase = getSupabase();
    const slug = tagName.toLowerCase().replace(/\s+/g, '-');
    const { data: existing } = await supabase.from('tags').select('*').eq('slug', slug).single();
    if (existing) return existing as Tag;
    const { data, error } = await supabase.from('tags').insert({ name: tagName, slug }).select('*').single();
    if (error) throw error;
    return data as Tag;
  }

  static async list() {
    const supabase = getSupabase();
    const { data, error } = await supabase.from('tags').select('*').order('usage_count', { ascending: false }).limit(50);
    if (error) throw error;
    return data as Tag[];
  }

  static async suggest(query: string) {
    const supabase = getSupabase();
    const { data, error } = await supabase.from('tags').select('*').ilike('name', `${query}%`).limit(10);
    if (error) throw error;
    return data as Tag[];
  }
}