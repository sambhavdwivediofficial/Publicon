import { getSupabase } from '../config/supabase';
import { Database } from '../types/database.types';

type Community = Database['public']['Tables']['communities']['Row'];

export class CommunityRepository {
  static async create(data: Database['public']['Tables']['communities']['Insert']) {
    const supabase = getSupabase();
    const { data: community, error } = await supabase
      .from('communities')
      .insert(data)
      .select('*')
      .single();
    if (error) throw error;
    return community as Community;
  }

  static async findBySlug(slug: string) {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('communities')
      .select('*')
      .eq('slug', slug)
      .single();
    if (error) return null;
    return data as Community;
  }

  static async findById(id: string) {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('communities')
      .select('*')
      .eq('id', id)
      .single();
    if (error) return null;
    return data as Community;
  }

  static async list(options: { page?: number; limit?: number; sort?: string; search?: string }) {
    const supabase = getSupabase();
    const page = options.page || 1;
    const limit = options.limit || 20;
    const offset = (page - 1) * limit;
    let query = supabase.from('communities').select('*', { count: 'exact' });
    if (options.search) query = query.ilike('name', `%${options.search}%`);
    if (options.sort === 'popular') query = query.order('members_count', { ascending: false });
    else if (options.sort === 'newest') query = query.order('created_at', { ascending: false });
    else query = query.order('name', { ascending: true });
    const { data, error, count } = await query.range(offset, offset + limit - 1);
    if (error) throw error;
    return { data: data as Community[], total: count || 0 };
  }

  static async update(id: string, updates: any) {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('communities')
      .update(updates as any)
      .eq('id', id)
      .select('*')
      .single();
    if (error) throw error;
    return data as Community;
  }

  static async delete(id: string) {
    const supabase = getSupabase();
    const { error } = await supabase.from('communities').delete().eq('id', id);
    if (error) throw error;
    return true;
  }

  static async incrementMembers(id: string, increment: number) {
    const supabase = getSupabase();
    const { error } = await supabase.rpc('increment_community_members', {
      community_id: id,
      inc: increment,
    });
    if (error) throw error;
  }
}