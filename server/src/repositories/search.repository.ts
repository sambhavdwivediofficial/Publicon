import { getSupabase } from '../config/supabase';

export class SearchRepository {
  static async globalSearch(query: string, type: string = 'all', page = 1, limit = 20) {
    const supabase = getSupabase();
    // Use Supabase full-text search or simple ILIKE
    const { data, error } = await supabase.rpc('global_search', {
      search_query: query,
      search_type: type,
      p_limit: limit,
      p_offset: (page - 1) * limit,
    });
    if (error) throw error;
    return data;
  }
}