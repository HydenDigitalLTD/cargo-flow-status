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
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      admin_users: {
        Row: {
          created_at: string
          email: string
          id: string
          is_active: boolean
          role: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          is_active?: boolean
          role?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          is_active?: boolean
          role?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      package_status_history: {
        Row: {
          created_at: string
          id: string
          location: string | null
          notes: string | null
          package_id: string
          status: Database["public"]["Enums"]["package_status"]
        }
        Insert: {
          created_at?: string
          id?: string
          location?: string | null
          notes?: string | null
          package_id: string
          status: Database["public"]["Enums"]["package_status"]
        }
        Update: {
          created_at?: string
          id?: string
          location?: string | null
          notes?: string | null
          package_id?: string
          status?: Database["public"]["Enums"]["package_status"]
        }
        Relationships: [
          {
            foreignKeyName: "package_status_history_package_id_fkey"
            columns: ["package_id"]
            isOneToOne: false
            referencedRelation: "packages"
            referencedColumns: ["id"]
          },
        ]
      }
      packages: {
        Row: {
          created_at: string
          current_status: Database["public"]["Enums"]["package_status"]
          dimensions: string | null
          id: string
          recipient_address: string
          recipient_name: string
          recipient_phone: string | null
          sender_address: string | null
          sender_name: string | null
          sender_phone: string | null
          service_type: string | null
          tracking_number: string
          updated_at: string
          weight: number | null
          woocommerce_order_id: string | null
        }
        Insert: {
          created_at?: string
          current_status?: Database["public"]["Enums"]["package_status"]
          dimensions?: string | null
          id?: string
          recipient_address: string
          recipient_name: string
          recipient_phone?: string | null
          sender_address?: string | null
          sender_name?: string | null
          sender_phone?: string | null
          service_type?: string | null
          tracking_number: string
          updated_at?: string
          weight?: number | null
          woocommerce_order_id?: string | null
        }
        Update: {
          created_at?: string
          current_status?: Database["public"]["Enums"]["package_status"]
          dimensions?: string | null
          id?: string
          recipient_address?: string
          recipient_name?: string
          recipient_phone?: string | null
          sender_address?: string | null
          sender_name?: string | null
          sender_phone?: string | null
          service_type?: string | null
          tracking_number?: string
          updated_at?: string
          weight?: number | null
          woocommerce_order_id?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string | null
          id: string
          role: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          id: string
          role?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          id?: string
          role?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      status_configs: {
        Row: {
          created_at: string
          days_after_previous: number | null
          description: string | null
          display_name: string
          hours_after_previous: number
          id: string
          is_active: boolean
          minutes_after_previous: number | null
          status: Database["public"]["Enums"]["package_status"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          days_after_previous?: number | null
          description?: string | null
          display_name: string
          hours_after_previous?: number
          id?: string
          is_active?: boolean
          minutes_after_previous?: number | null
          status: Database["public"]["Enums"]["package_status"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          days_after_previous?: number | null
          description?: string | null
          display_name?: string
          hours_after_previous?: number
          id?: string
          is_active?: boolean
          minutes_after_previous?: number | null
          status?: Database["public"]["Enums"]["package_status"]
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      auto_update_package_status: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      is_admin_user: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      is_authenticated_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      trigger_auto_update: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
    }
    Enums: {
      package_status:
        | "registered"
        | "ready_for_pickup"
        | "in_transit"
        | "out_for_delivery"
        | "delivered"
        | "failed_delivery"
        | "returned"
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
      package_status: [
        "registered",
        "ready_for_pickup",
        "in_transit",
        "out_for_delivery",
        "delivered",
        "failed_delivery",
        "returned",
      ],
    },
  },
} as const
