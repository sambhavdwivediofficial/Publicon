import { getSupabase } from '../config/supabase';
import { Database } from '../types/database.types';

type Post = Database['public']['Tables']['posts']['Row'];

export class PostRepository {
  static async create(data: Database['public']['Tables']['posts']['Insert']) {
    const supabase = getSupabase();
    const { data: post, error } = await supabase
      .from('posts')
      .insert(data)
      .select('*')
      .single();
    if (error) throw error;
    return post as Post;
  }

  static async findById(id: string) {
    const supabase = getSupabase();
    const { data, error } = await supabase.from('posts').select('*').eq('id', id).single();
    if (error) return null;
    return data as Post;
  }

  static async list(options: {
    page?: number;
    limit?: number;
    sort?: string;
    communityId?: string;
    userId?: string;
  }) {
    const supabase = getSupabase();
    const page = options.page || 1;
    const limit = options.limit || 20;
    const offset = (page - 1) * limit;
    let query = supabase.from('posts').select('*', { count: 'exact' });
    if (options.communityId) query = query.eq('community_id', options.communityId);
    if (options.userId) query = query.eq('author_id', options.userId);
    if (options.sort === 'newest') query = query.order('created_at', { ascending: false });
    else if (options.sort === 'top') query = query.order('votes_count', { ascending: false });
    else query = query.order('created_at', { ascending: false });
    const { data, error, count } = await query.range(offset, offset + limit - 1);
    if (error) throw error;
    return { data: data as Post[], total: count || 0 };
  }

  static async update(id: string, updates: any) {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('posts')
      .update(updates as any)
      .eq('id', id)
      .select('*')
      .single();
    if (error) throw error;
    return data as Post;
  }

  static async delete(id: string) {
    const supabase = getSupabase();
    const { error } = await supabase.from('posts').delete().eq('id', id);
    if (error) throw error;
    return true;
  }
}