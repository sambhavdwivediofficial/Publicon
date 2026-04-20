import { getSupabase } from '../config/supabase';
import { Database } from '../types/database.types';

type Follow = Database['public']['Tables']['follows']['Row'];

export class FollowRepository {
  static async follow(followerId: string, followingId: string) {
    const supabase = getSupabase();
    const { data, error } = await supabase.from('follows').insert({ follower_id: followerId, following_id: followingId }).select('*').single();
    if (error) throw error;
    return data as Follow;
  }

  static async unfollow(followerId: string, followingId: string) {
    const supabase = getSupabase();
    const { error } = await supabase.from('follows').delete().eq('follower_id', followerId).eq('following_id', followingId);
    if (error) throw error;
    return true;
  }

  static async isFollowing(followerId: string, followingId: string): Promise<boolean> {
    const supabase = getSupabase();
    const { data, error } = await supabase.from('follows').select('id').eq('follower_id', followerId).eq('following_id', followingId).maybeSingle();
    if (error) return false;
    return !!data;
  }

  static async getFollowersCount(userId: string): Promise<number> {
    const supabase = getSupabase();
    const { count, error } = await supabase.from('follows').select('*', { count: 'exact', head: true }).eq('following_id', userId);
    if (error) throw error;
    return count || 0;
  }

  static async getFollowingCount(userId: string): Promise<number> {
    const supabase = getSupabase();
    const { count, error } = await supabase.from('follows').select('*', { count: 'exact', head: true }).eq('follower_id', userId);
    if (error) throw error;
    return count || 0;
  }
}