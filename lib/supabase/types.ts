export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string
          email: string
          avatar_url: string | null
          education_level: string | null
          field_of_study: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          full_name: string
          email: string
          avatar_url?: string | null
          education_level?: string | null
          field_of_study?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string
          email?: string
          avatar_url?: string | null
          education_level?: string | null
          field_of_study?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      assessments: {
        Row: {
          id: string
          title: string
          description: string
          type: 'RIASEC' | 'BIG_FIVE' | 'SKILLS'
          duration_minutes: number
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          type: 'RIASEC' | 'BIG_FIVE' | 'SKILLS'
          duration_minutes: number
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          type?: 'RIASEC' | 'BIG_FIVE' | 'SKILLS'
          duration_minutes?: number
          created_at?: string
        }
      }
      questions: {
        Row: {
          id: string
          assessment_id: string
          question_text: string
          options: Json
          scoring_logic: Json
          order_number: number
          created_at: string
        }
        Insert: {
          id?: string
          assessment_id: string
          question_text: string
          options: Json
          scoring_logic: Json
          order_number: number
          created_at?: string
        }
        Update: {
          id?: string
          assessment_id?: string
          question_text?: string
          options?: Json
          scoring_logic?: Json
          order_number?: number
          created_at?: string
        }
      }
      user_responses: {
        Row: {
          id: string
          user_id: string
          question_id: string
          response: Json
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          question_id: string
          response: Json
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          question_id?: string
          response?: Json
          created_at?: string
        }
      }
      user_results: {
        Row: {
          id: string
          user_id: string
          assessment_id: string
          results: Json
          completed_at: string
        }
        Insert: {
          id?: string
          user_id: string
          assessment_id: string
          results: Json
          completed_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          assessment_id?: string
          results?: Json
          completed_at?: string
        }
      }
      resources: {
        Row: {
          id: string
          title: string
          description: string
          type: 'VIDEO' | 'ARTICLE'
          content_url: string
          thumbnail_url: string | null
          categories: string[]
          duration_minutes: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          type: 'VIDEO' | 'ARTICLE'
          content_url: string
          thumbnail_url?: string | null
          categories: string[]
          duration_minutes?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          type?: 'VIDEO' | 'ARTICLE'
          content_url?: string
          thumbnail_url?: string | null
          categories?: string[]
          duration_minutes?: number | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
