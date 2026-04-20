export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      users: { Row: any; Insert: any; Update: any };
      questions: { Row: any; Insert: any; Update: any };
      answers: { Row: any; Insert: any; Update: any };
      posts: { Row: any; Insert: any; Update: any };
      communities: { Row: any; Insert: any; Update: any };
      comments: { Row: any; Insert: any; Update: any };
      votes: { Row: any; Insert: any; Update: any };
      likes: { Row: any; Insert: any; Update: any };
      shares: { Row: any; Insert: any; Update: any };
      follows: { Row: any; Insert: any; Update: any };
      community_members: { Row: any; Insert: any; Update: any };
      media: { Row: any; Insert: any; Update: any };
      notifications: { Row: any; Insert: any; Update: any };
      tags: { Row: any; Insert: any; Update: any };
    };
  };
}