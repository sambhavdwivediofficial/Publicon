import { getSupabase } from '../config/supabase';

export class FeedRepository {
  static async getPersonalizedFeed(userId: string, page = 1, limit = 20) {
    const supabase = getSupabase();
    const offset = (page - 1) * limit;
    // Simple implementation: fetch recent questions and posts from followed communities/users
    const { data, error } = await supabase.rpc('get_personalized_feed', {
      p_user_id: userId,
      p_limit: limit,
      p_offset: offset,
    });
    if (error) throw error;
    return data;
  }
}