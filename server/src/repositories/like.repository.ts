import { getSupabase } from '../config/supabase';

export class LikeRepository {
  static async like(userId: string, targetType: string, targetId: string) {
    const supabase = getSupabase();
    const { data, error } = await supabase.from('likes').insert({ user_id: userId, target_type: targetType, target_id: targetId }).select('*').single();
    if (error) throw error;
    return data;
  }

  static async unlike(userId: string, targetType: string, targetId: string) {
    const supabase = getSupabase();
    const { error } = await supabase.from('likes').delete().eq('user_id', userId).eq('target_type', targetType).eq('target_id', targetId);
    if (error) throw error;
    return true;
  }

  static async hasLiked(userId: string, targetType: string, targetId: string): Promise<boolean> {
    const supabase = getSupabase();
    const { data } = await supabase.from('likes').select('id').eq('user_id', userId).eq('target_type', targetType).eq('target_id', targetId).maybeSingle();
    return !!data;
  }

  static async getLikesCount(targetType: string, targetId: string): Promise<number> {
    const supabase = getSupabase();
    const { count, error } = await supabase.from('likes').select('*', { count: 'exact', head: true }).eq('target_type', targetType).eq('target_id', targetId);
    if (error) throw error;
    return count || 0;
  }
}