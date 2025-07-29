export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      booking_payments: {
        Row: {
          booking_id: string
          created_at: string
          guarantee_amount: number | null
          id: string
          paid_at: string | null
          payment_method: Database["public"]["Enums"]["payment_method_type"]
          payment_status:
            | Database["public"]["Enums"]["transaction_status"]
            | null
          stripe_payment_intent_id: string | null
          total_amount: number
          updated_at: string
        }
        Insert: {
          booking_id: string
          created_at?: string
          guarantee_amount?: number | null
          id?: string
          paid_at?: string | null
          payment_method: Database["public"]["Enums"]["payment_method_type"]
          payment_status?:
            | Database["public"]["Enums"]["transaction_status"]
            | null
          stripe_payment_intent_id?: string | null
          total_amount: number
          updated_at?: string
        }
        Update: {
          booking_id?: string
          created_at?: string
          guarantee_amount?: number | null
          id?: string
          paid_at?: string | null
          payment_method?: Database["public"]["Enums"]["payment_method_type"]
          payment_status?:
            | Database["public"]["Enums"]["transaction_status"]
            | null
          stripe_payment_intent_id?: string | null
          total_amount?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "booking_payments_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
        ]
      }
      bookings: {
        Row: {
          address: string
          city: string
          created_at: string
          description: string | null
          estimated_hours: number | null
          id: string
          phone: string
          professional_id: string
          scheduled_date: string | null
          service_id: string
          status: string | null
          title: string
          total_price: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          address: string
          city: string
          created_at?: string
          description?: string | null
          estimated_hours?: number | null
          id?: string
          phone: string
          professional_id: string
          scheduled_date?: string | null
          service_id: string
          status?: string | null
          title: string
          total_price?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          address?: string
          city?: string
          created_at?: string
          description?: string | null
          estimated_hours?: number | null
          id?: string
          phone?: string
          professional_id?: string
          scheduled_date?: string | null
          service_id?: string
          status?: string | null
          title?: string
          total_price?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookings_professional_id_fkey"
            columns: ["professional_id"]
            isOneToOne: false
            referencedRelation: "professionals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "professional_services"
            referencedColumns: ["id"]
          },
        ]
      }
      commission_charges: {
        Row: {
          booking_id: string
          charge_status:
            | Database["public"]["Enums"]["transaction_status"]
            | null
          charged_at: string | null
          commission_amount: number
          commission_rate: number
          created_at: string
          id: string
          last_retry_at: string | null
          payment_method_id: string | null
          professional_id: string
          retry_count: number | null
          stripe_charge_id: string | null
          updated_at: string
        }
        Insert: {
          booking_id: string
          charge_status?:
            | Database["public"]["Enums"]["transaction_status"]
            | null
          charged_at?: string | null
          commission_amount: number
          commission_rate?: number
          created_at?: string
          id?: string
          last_retry_at?: string | null
          payment_method_id?: string | null
          professional_id: string
          retry_count?: number | null
          stripe_charge_id?: string | null
          updated_at?: string
        }
        Update: {
          booking_id?: string
          charge_status?:
            | Database["public"]["Enums"]["transaction_status"]
            | null
          charged_at?: string | null
          commission_amount?: number
          commission_rate?: number
          created_at?: string
          id?: string
          last_retry_at?: string | null
          payment_method_id?: string | null
          professional_id?: string
          retry_count?: number | null
          stripe_charge_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "commission_charges_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "commission_charges_payment_method_id_fkey"
            columns: ["payment_method_id"]
            isOneToOne: false
            referencedRelation: "professional_payment_cards"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "commission_charges_professional_id_fkey"
            columns: ["professional_id"]
            isOneToOne: false
            referencedRelation: "professionals"
            referencedColumns: ["id"]
          },
        ]
      }
      job_completions: {
        Row: {
          booking_id: string
          client_verification_at: string | null
          commission_amount: number
          commission_rate: number
          completed_at: string
          created_at: string
          id: string
          payment_date: string | null
          payment_status: string | null
          professional_id: string
          service_amount: number
          updated_at: string
          user_id: string
          verified_by_client: boolean | null
        }
        Insert: {
          booking_id: string
          client_verification_at?: string | null
          commission_amount: number
          commission_rate?: number
          completed_at?: string
          created_at?: string
          id?: string
          payment_date?: string | null
          payment_status?: string | null
          professional_id: string
          service_amount: number
          updated_at?: string
          user_id: string
          verified_by_client?: boolean | null
        }
        Update: {
          booking_id?: string
          client_verification_at?: string | null
          commission_amount?: number
          commission_rate?: number
          completed_at?: string
          created_at?: string
          id?: string
          payment_date?: string | null
          payment_status?: string | null
          professional_id?: string
          service_amount?: number
          updated_at?: string
          user_id?: string
          verified_by_client?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "job_completions_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: true
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "job_completions_professional_id_fkey"
            columns: ["professional_id"]
            isOneToOne: false
            referencedRelation: "professionals"
            referencedColumns: ["id"]
          },
        ]
      }
      payment_transactions: {
        Row: {
          amount: number
          booking_payment_id: string
          created_at: string
          currency: string | null
          id: string
          processed_at: string | null
          status: Database["public"]["Enums"]["transaction_status"] | null
          stripe_fee: number | null
          stripe_payment_intent_id: string | null
          transaction_type: string
          updated_at: string
        }
        Insert: {
          amount: number
          booking_payment_id: string
          created_at?: string
          currency?: string | null
          id?: string
          processed_at?: string | null
          status?: Database["public"]["Enums"]["transaction_status"] | null
          stripe_fee?: number | null
          stripe_payment_intent_id?: string | null
          transaction_type: string
          updated_at?: string
        }
        Update: {
          amount?: number
          booking_payment_id?: string
          created_at?: string
          currency?: string | null
          id?: string
          processed_at?: string | null
          status?: Database["public"]["Enums"]["transaction_status"] | null
          stripe_fee?: number | null
          stripe_payment_intent_id?: string | null
          transaction_type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "payment_transactions_booking_payment_id_fkey"
            columns: ["booking_payment_id"]
            isOneToOne: false
            referencedRelation: "booking_payments"
            referencedColumns: ["id"]
          },
        ]
      }
      premium_services: {
        Row: {
          created_at: string
          duration_days: number | null
          expires_at: string | null
          id: string
          price: number
          professional_id: string
          purchased_at: string
          service_type: string
          status: string | null
        }
        Insert: {
          created_at?: string
          duration_days?: number | null
          expires_at?: string | null
          id?: string
          price: number
          professional_id: string
          purchased_at?: string
          service_type: string
          status?: string | null
        }
        Update: {
          created_at?: string
          duration_days?: number | null
          expires_at?: string | null
          id?: string
          price?: number
          professional_id?: string
          purchased_at?: string
          service_type?: string
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "premium_services_professional_id_fkey"
            columns: ["professional_id"]
            isOneToOne: false
            referencedRelation: "professionals"
            referencedColumns: ["id"]
          },
        ]
      }
      professional_payment_cards: {
        Row: {
          card_brand: string
          card_last_four: string
          created_at: string
          id: string
          is_default: boolean | null
          professional_id: string
          stripe_customer_id: string
          stripe_payment_method_id: string
          updated_at: string
        }
        Insert: {
          card_brand: string
          card_last_four: string
          created_at?: string
          id?: string
          is_default?: boolean | null
          professional_id: string
          stripe_customer_id: string
          stripe_payment_method_id: string
          updated_at?: string
        }
        Update: {
          card_brand?: string
          card_last_four?: string
          created_at?: string
          id?: string
          is_default?: boolean | null
          professional_id?: string
          stripe_customer_id?: string
          stripe_payment_method_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "professional_payment_cards_professional_id_fkey"
            columns: ["professional_id"]
            isOneToOne: false
            referencedRelation: "professionals"
            referencedColumns: ["id"]
          },
        ]
      }
      professional_payouts: {
        Row: {
          booking_payment_id: string
          commission_amount: number
          created_at: string
          gross_amount: number
          id: string
          net_amount: number
          payment_method_id: string | null
          payout_status:
            | Database["public"]["Enums"]["transaction_status"]
            | null
          professional_id: string
          stripe_transfer_id: string | null
          transferred_at: string | null
          updated_at: string
        }
        Insert: {
          booking_payment_id: string
          commission_amount: number
          created_at?: string
          gross_amount: number
          id?: string
          net_amount: number
          payment_method_id?: string | null
          payout_status?:
            | Database["public"]["Enums"]["transaction_status"]
            | null
          professional_id: string
          stripe_transfer_id?: string | null
          transferred_at?: string | null
          updated_at?: string
        }
        Update: {
          booking_payment_id?: string
          commission_amount?: number
          created_at?: string
          gross_amount?: number
          id?: string
          net_amount?: number
          payment_method_id?: string | null
          payout_status?:
            | Database["public"]["Enums"]["transaction_status"]
            | null
          professional_id?: string
          stripe_transfer_id?: string | null
          transferred_at?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "professional_payouts_booking_payment_id_fkey"
            columns: ["booking_payment_id"]
            isOneToOne: false
            referencedRelation: "booking_payments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "professional_payouts_payment_method_id_fkey"
            columns: ["payment_method_id"]
            isOneToOne: false
            referencedRelation: "professional_payment_cards"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "professional_payouts_professional_id_fkey"
            columns: ["professional_id"]
            isOneToOne: false
            referencedRelation: "professionals"
            referencedColumns: ["id"]
          },
        ]
      }
      professional_rankings: {
        Row: {
          average_rating: number | null
          created_at: string
          id: string
          last_job_completed_at: string | null
          professional_id: string
          ranking_score: number | null
          total_jobs_completed: number | null
          total_revenue: number | null
          total_reviews: number | null
          updated_at: string
          visibility_score: number | null
        }
        Insert: {
          average_rating?: number | null
          created_at?: string
          id?: string
          last_job_completed_at?: string | null
          professional_id: string
          ranking_score?: number | null
          total_jobs_completed?: number | null
          total_revenue?: number | null
          total_reviews?: number | null
          updated_at?: string
          visibility_score?: number | null
        }
        Update: {
          average_rating?: number | null
          created_at?: string
          id?: string
          last_job_completed_at?: string | null
          professional_id?: string
          ranking_score?: number | null
          total_jobs_completed?: number | null
          total_revenue?: number | null
          total_reviews?: number | null
          updated_at?: string
          visibility_score?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "professional_rankings_professional_id_fkey"
            columns: ["professional_id"]
            isOneToOne: true
            referencedRelation: "professionals"
            referencedColumns: ["id"]
          },
        ]
      }
      professional_services: {
        Row: {
          category_id: string
          created_at: string
          description: string | null
          id: string
          price_max: number | null
          price_min: number | null
          professional_id: string
          title: string
        }
        Insert: {
          category_id: string
          created_at?: string
          description?: string | null
          id?: string
          price_max?: number | null
          price_min?: number | null
          professional_id: string
          title: string
        }
        Update: {
          category_id?: string
          created_at?: string
          description?: string | null
          id?: string
          price_max?: number | null
          price_min?: number | null
          professional_id?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "professional_services_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "service_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "professional_services_professional_id_fkey"
            columns: ["professional_id"]
            isOneToOne: false
            referencedRelation: "professionals"
            referencedColumns: ["id"]
          },
        ]
      }
      professional_verifications: {
        Row: {
          admin_notes: string | null
          created_at: string
          id: string
          identity_document_url: string | null
          identity_verified: boolean | null
          overall_verified: boolean | null
          police_certificate_url: string | null
          police_verified: boolean | null
          professional_certificate_url: string | null
          professional_certified: boolean | null
          professional_id: string
          rejection_reason: string | null
          updated_at: string
          verified_at: string | null
          verified_by: string | null
        }
        Insert: {
          admin_notes?: string | null
          created_at?: string
          id?: string
          identity_document_url?: string | null
          identity_verified?: boolean | null
          overall_verified?: boolean | null
          police_certificate_url?: string | null
          police_verified?: boolean | null
          professional_certificate_url?: string | null
          professional_certified?: boolean | null
          professional_id: string
          rejection_reason?: string | null
          updated_at?: string
          verified_at?: string | null
          verified_by?: string | null
        }
        Update: {
          admin_notes?: string | null
          created_at?: string
          id?: string
          identity_document_url?: string | null
          identity_verified?: boolean | null
          overall_verified?: boolean | null
          police_certificate_url?: string | null
          police_verified?: boolean | null
          professional_certificate_url?: string | null
          professional_certified?: boolean | null
          professional_id?: string
          rejection_reason?: string | null
          updated_at?: string
          verified_at?: string | null
          verified_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "professional_verifications_professional_id_fkey"
            columns: ["professional_id"]
            isOneToOne: false
            referencedRelation: "professionals"
            referencedColumns: ["id"]
          },
        ]
      }
      professionals: {
        Row: {
          available: boolean | null
          avatar_url: string | null
          city: string | null
          created_at: string
          description: string | null
          email: string
          experience_years: number | null
          full_name: string
          hourly_rate: number | null
          id: string
          phone: string
          updated_at: string
          user_id: string
          verified: boolean | null
        }
        Insert: {
          available?: boolean | null
          avatar_url?: string | null
          city?: string | null
          created_at?: string
          description?: string | null
          email: string
          experience_years?: number | null
          full_name: string
          hourly_rate?: number | null
          id?: string
          phone: string
          updated_at?: string
          user_id: string
          verified?: boolean | null
        }
        Update: {
          available?: boolean | null
          avatar_url?: string | null
          city?: string | null
          created_at?: string
          description?: string | null
          email?: string
          experience_years?: number | null
          full_name?: string
          hourly_rate?: number | null
          id?: string
          phone?: string
          updated_at?: string
          user_id?: string
          verified?: boolean | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          address: string | null
          city: string | null
          created_at: string
          full_name: string
          id: string
          phone: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          address?: string | null
          city?: string | null
          created_at?: string
          full_name: string
          id?: string
          phone?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          address?: string | null
          city?: string | null
          created_at?: string
          full_name?: string
          id?: string
          phone?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      reviews: {
        Row: {
          booking_id: string
          comment: string | null
          created_at: string
          id: string
          professional_id: string
          rating: number
          user_id: string
        }
        Insert: {
          booking_id: string
          comment?: string | null
          created_at?: string
          id?: string
          professional_id: string
          rating: number
          user_id: string
        }
        Update: {
          booking_id?: string
          comment?: string | null
          created_at?: string
          id?: string
          professional_id?: string
          rating?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: true
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_professional_id_fkey"
            columns: ["professional_id"]
            isOneToOne: false
            referencedRelation: "professionals"
            referencedColumns: ["id"]
          },
        ]
      }
      service_categories: {
        Row: {
          created_at: string
          description: string | null
          icon: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      calculate_commission: {
        Args: { service_amount: number; commission_rate?: number }
        Returns: number
      }
      calculate_ranking_score: {
        Args: {
          total_jobs: number
          avg_rating: number
          total_reviews: number
          visibility: number
          last_job_days_ago: number
        }
        Returns: number
      }
      is_professional_verified: {
        Args: { prof_id: string }
        Returns: boolean
      }
    }
    Enums: {
      payment_method_type:
        | "direct_payment"
        | "guarantee_payment"
        | "full_app_payment"
      transaction_status: "pending" | "completed" | "failed" | "refunded"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      payment_method_type: [
        "direct_payment",
        "guarantee_payment",
        "full_app_payment",
      ],
      transaction_status: ["pending", "completed", "failed", "refunded"],
    },
  },
} as const
