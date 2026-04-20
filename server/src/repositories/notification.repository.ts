import { getSupabase } from '../config/supabase';
import { Database } from '../types/database.types';

type Notification = Database['public']['Tables']['notifications']['Row'];

export class NotificationRepository {
  static async create(data: Database['public']['Tables']['notifications']['Insert']) {
    const supabase = getSupabase();
    const { data: notification, error } = await supabase.from('notifications').insert(data).select('*').single();
    if (error) throw error;
    return notification as Notification;
  }

  static async findByUser(userId: string, page = 1, limit = 20, unreadOnly = false) {
    const supabase = getSupabase();
    const offset = (page - 1) * limit;
    let query = supabase.from('notifications').select('*', { count: 'exact' }).eq('user_id', userId);
    if (unreadOnly) query = query.eq('is_read', false);
    query = query.order('created_at', { ascending: false }).range(offset, offset + limit - 1);
    const { data, error, count } = await query;
    if (error) throw error;
    return { data: data as Notification[], total: count || 0 };
  }

  static async markAsRead(id: string) {
    const supabase = getSupabase();
    const { error } = await supabase.from('notifications').update({ is_read: true }).eq('id', id);
    if (error) throw error;
  }

  static async markAllAsRead(userId: string) {
    const supabase = getSupabase();
    const { error } = await supabase.from('notifications').update({ is_read: true }).eq('user_id', userId).eq('is_read', false);
    if (error) throw error;
  }
}