import { getSupabase } from '../config/supabase';
import { Database } from '../types/database.types';

type Question = Database['public']['Tables']['questions']['Row'];

export class QuestionRepository {
  static async create(data: Database['public']['Tables']['questions']['Insert']) {
    const supabase = getSupabase();
    const { data: question, error } = await supabase
      .from('questions')
      .insert(data)
      .select('*')
      .single();
    if (error) throw error;
    return question as Question;
  }

  static async findById(id: string) {
    const supabase = getSupabase();
    const { data, error } = await supabase.from('questions').select('*').eq('id', id).single();
    if (error) return null;
    return data as Question;
  }

  static async list(options: {
    page?: number;
    limit?: number;
    sort?: string;
    tag?: string;
    communityId?: string;
  }) {
    const supabase = getSupabase();
    const page = options.page || 1;
    const limit = options.limit || 20;
    const offset = (page - 1) * limit;
    let query = supabase.from('questions').select('*', { count: 'exact' });
    if (options.tag) query = query.contains('tags', [options.tag]);
    if (options.communityId) query = query.eq('community_id', options.communityId);
    if (options.sort === 'trending') query = query.order('views_count', { ascending: false });
    else if (options.sort === 'newest') query = query.order('created_at', { ascending: false });
    else query = query.order('answers_count', { ascending: false });
    const { data, error, count } = await query.range(offset, offset + limit - 1);
    if (error) throw error;
    return { data: data as Question[], total: count || 0 };
  }

  static async update(id: string, updates: any) {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('questions')
      .update(updates as any)
      .eq('id', id)
      .select('*')
      .single();
    if (error) throw error;
    return data as Question;
  }

  static async delete(id: string) {
    const supabase = getSupabase();
    const { error } = await supabase.from('questions').delete().eq('id', id);
    if (error) throw error;
    return true;
  }

  static async incrementViews(id: string) {
    const supabase = getSupabase();
    const { error } = await supabase.rpc('increment_question_views', { question_id: id });
    if (error) throw error;
  }
}