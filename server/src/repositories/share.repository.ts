import { getSupabase } from '../config/supabase';

export class ShareRepository {
  static async create(userId: string, targetType: string, targetId: string, platform?: string) {
    const supabase = getSupabase();
    const { data, error } = await supabase.from('shares').insert({
      user_id: userId,
      target_type: targetType,
      target_id: targetId,
      platform,
    }).select('*').single();
    if (error) throw error;
    return data;
  }

  static async getSharesCount(targetType: string, targetId: string): Promise<number> {
    const supabase = getSupabase();
    const { count, error } = await supabase.from('shares').select('*', { count: 'exact', head: true }).eq('target_type', targetType).eq('target_id', targetId);
    if (error) throw error;
    return count || 0;
  }
}