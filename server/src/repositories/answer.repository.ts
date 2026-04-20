import { getSupabase } from '../config/supabase';
import { Database } from '../types/database.types';

type Answer = Database['public']['Tables']['answers']['Row'];

export class AnswerRepository {
  static async create(data: Database['public']['Tables']['answers']['Insert']) {
    const supabase = getSupabase();
    const { data: answer, error } = await supabase
      .from('answers')
      .insert(data)
      .select('*')
      .single();
    if (error) throw error;
    return answer as Answer;
  }

  static async findById(id: string) {
    const supabase = getSupabase();
    const { data, error } = await supabase.from('answers').select('*').eq('id', id).single();
    if (error) return null;
    return data as Answer;
  }

  static async findByQuestionId(
    questionId: string,
    page = 1,
    limit = 10,
    sort = 'votes'
  ) {
    const supabase = getSupabase();
    const offset = (page - 1) * limit;
    let query = supabase
      .from('answers')
      .select('*', { count: 'exact' })
      .eq('question_id', questionId);

    if (sort === 'votes') {
      query = query.order('votes_count', { ascending: false });
    } else if (sort === 'newest') {
      query = query.order('created_at', { ascending: false });
    } else {
      query = query.order('created_at', { ascending: true });
    }

    const { data, error, count } = await query.range(offset, offset + limit - 1);
    if (error) throw error;
    return { data: data as Answer[], total: count || 0 };
  }

  static async update(id: string, updates: any) {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('answers')
      .update(updates as any)
      .eq('id', id)
      .select('*')
      .single();
    if (error) throw error;
    return data as Answer;
  }

  static async delete(id: string) {
    const supabase = getSupabase();
    const { error } = await supabase.from('answers').delete().eq('id', id);
    if (error) throw error;
    return true;
  }

  static async incrementVotes(id: string, increment: number) {
    const supabase = getSupabase();
    const { error } = await supabase.rpc('increment_answer_votes', {
      answer_id: id,
      inc: increment,
    });
    if (error) throw error;
  }

  static async getCountByQuestion(questionId: string): Promise<number> {
    const supabase = getSupabase();
    const { count, error } = await supabase
      .from('answers')
      .select('*', { count: 'exact', head: true })
      .eq('question_id', questionId);
    if (error) throw error;
    return count || 0;
  }
}