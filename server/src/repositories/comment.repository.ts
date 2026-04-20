import { getSupabase } from '../config/supabase';
import { Database } from '../types/database.types';

type Comment = Database['public']['Tables']['comments']['Row'];

export class CommentRepository {
  static async create(data: Database['public']['Tables']['comments']['Insert']) {
    const supabase = getSupabase();
    const { data: comment, error } = await supabase
      .from('comments')
      .insert(data)
      .select('*')
      .single();
    if (error) throw error;
    return comment as Comment;
  }

  static async findByTarget(
    targetType: string,
    targetId: string,
    page = 1,
    limit = 20,
    sort = 'newest'
  ) {
    const supabase = getSupabase();
    const offset = (page - 1) * limit;
    let query = supabase
      .from('comments')
      .select('*', { count: 'exact' })
      .eq('target_type', targetType)
      .eq('target_id', targetId)
      .is('parent_id', null);

    if (sort === 'newest') {
      query = query.order('created_at', { ascending: false });
    } else if (sort === 'oldest') {
      query = query.order('created_at', { ascending: true });
    } else if (sort === 'top') {
      query = query.order('votes_count', { ascending: false });
    }

    const { data, error, count } = await query.range(offset, offset + limit - 1);
    if (error) throw error;
    return { data: data as Comment[], total: count || 0 };
  }

  static async findReplies(parentId: string) {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('parent_id', parentId)
      .order('created_at', { ascending: true });
    if (error) throw error;
    return data as Comment[];
  }

  static async update(id: string, updates: any) {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('comments')
      .update(updates as any)
      .eq('id', id)
      .select('*')
      .single();
    if (error) throw error;
    return data as Comment;
  }

  static async delete(id: string) {
    const supabase = getSupabase();
    const { error } = await supabase.from('comments').delete().eq('id', id);
    if (error) throw error;
    return true;
  }

  static async incrementVotes(id: string, increment: number) {
    const supabase = getSupabase();
    const { error } = await supabase.rpc('increment_comment_votes', {
      comment_id: id,
      inc: increment,
    });
    if (error) throw error;
  }

  static async getCountByTarget(targetType: string, targetId: string): Promise<number> {
    const supabase = getSupabase();
    const { count, error } = await supabase
      .from('comments')
      .select('*', { count: 'exact', head: true })
      .eq('target_type', targetType)
      .eq('target_id', targetId);
    if (error) throw error;
    return count || 0;
  }
}