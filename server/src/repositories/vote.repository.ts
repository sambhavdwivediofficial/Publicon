import { getSupabase } from '../config/supabase';

export class VoteRepository {
  static async vote(userId: string, targetType: string, targetId: string, value: number) {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('votes')
      .upsert(
        {
          user_id: userId,
          target_type: targetType,
          target_id: targetId,
          value,
        },
        { onConflict: 'user_id,target_type,target_id' }
      )
      .select('*')
      .single();
    if (error) throw error;
    return data;
  }

  static async removeVote(userId: string, targetType: string, targetId: string) {
    const supabase = getSupabase();
    const { error } = await supabase
      .from('votes')
      .delete()
      .eq('user_id', userId)
      .eq('target_type', targetType)
      .eq('target_id', targetId);
    if (error) throw error;
    return true;
  }

  static async getUserVote(userId: string, targetType: string, targetId: string) {
    const supabase = getSupabase();
    const { data } = await supabase
      .from('votes')
      .select('value')
      .eq('user_id', userId)
      .eq('target_type', targetType)
      .eq('target_id', targetId)
      .single();
    return data?.value || 0;
  }

  static async getVoteCount(targetType: string, targetId: string): Promise<number> {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('votes')
      .select('value')
      .eq('target_type', targetType)
      .eq('target_id', targetId);
    if (error) throw error;
    return (data || []).reduce((sum, v) => sum + v.value, 0);
  }
}