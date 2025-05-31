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
      booking_history: {
        Row: {
          booking_id: string
          changed_by: string | null
          created_at: string | null
          id: string
          notes: string | null
          status: Database["public"]["Enums"]["booking_status"]
        }
        Insert: {
          booking_id: string
          changed_by?: string | null
          created_at?: string | null
          id?: string
          notes?: string | null
          status: Database["public"]["Enums"]["booking_status"]
        }
        Update: {
          booking_id?: string
          changed_by?: string | null
          created_at?: string | null
          id?: string
          notes?: string | null
          status?: Database["public"]["Enums"]["booking_status"]
        }
        Relationships: [
          {
            foreignKeyName: "booking_history_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
        ]
      }
      bookings: {
        Row: {
          actual_fare: number | null
          booking_number: string
          company_id: string
          created_at: string | null
          driver_id: string | null
          dropoff_location: string
          estimated_distance: number | null
          estimated_duration: number | null
          fare_amount: number | null
          feedback: string | null
          guest_email: string | null
          guest_name: string
          guest_phone: string
          id: string
          payment_status: string | null
          pickup_datetime: string
          pickup_location: string
          rating: number | null
          special_instructions: string | null
          status: Database["public"]["Enums"]["booking_status"] | null
          trip_ended_at: string | null
          trip_started_at: string | null
          updated_at: string | null
          vehicle_id: string | null
          vehicle_type_requested:
            | Database["public"]["Enums"]["vehicle_type"]
            | null
          vendor_id: string | null
          visibility: Database["public"]["Enums"]["booking_visibility"] | null
          visibility_changed_at: string | null
        }
        Insert: {
          actual_fare?: number | null
          booking_number: string
          company_id: string
          created_at?: string | null
          driver_id?: string | null
          dropoff_location: string
          estimated_distance?: number | null
          estimated_duration?: number | null
          fare_amount?: number | null
          feedback?: string | null
          guest_email?: string | null
          guest_name: string
          guest_phone: string
          id?: string
          payment_status?: string | null
          pickup_datetime: string
          pickup_location: string
          rating?: number | null
          special_instructions?: string | null
          status?: Database["public"]["Enums"]["booking_status"] | null
          trip_ended_at?: string | null
          trip_started_at?: string | null
          updated_at?: string | null
          vehicle_id?: string | null
          vehicle_type_requested?:
            | Database["public"]["Enums"]["vehicle_type"]
            | null
          vendor_id?: string | null
          visibility?: Database["public"]["Enums"]["booking_visibility"] | null
          visibility_changed_at?: string | null
        }
        Update: {
          actual_fare?: number | null
          booking_number?: string
          company_id?: string
          created_at?: string | null
          driver_id?: string | null
          dropoff_location?: string
          estimated_distance?: number | null
          estimated_duration?: number | null
          fare_amount?: number | null
          feedback?: string | null
          guest_email?: string | null
          guest_name?: string
          guest_phone?: string
          id?: string
          payment_status?: string | null
          pickup_datetime?: string
          pickup_location?: string
          rating?: number | null
          special_instructions?: string | null
          status?: Database["public"]["Enums"]["booking_status"] | null
          trip_ended_at?: string | null
          trip_started_at?: string | null
          updated_at?: string | null
          vehicle_id?: string | null
          vehicle_type_requested?:
            | Database["public"]["Enums"]["vehicle_type"]
            | null
          vendor_id?: string | null
          visibility?: Database["public"]["Enums"]["booking_visibility"] | null
          visibility_changed_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bookings_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_driver_id_fkey"
            columns: ["driver_id"]
            isOneToOne: false
            referencedRelation: "drivers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendors"
            referencedColumns: ["id"]
          },
        ]
      }
      companies: {
        Row: {
          address: string | null
          billing_address: string | null
          contact_person: string | null
          created_at: string | null
          email: string | null
          id: string
          name: string
          phone: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          address?: string | null
          billing_address?: string | null
          contact_person?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          name: string
          phone?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          address?: string | null
          billing_address?: string | null
          contact_person?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          name?: string
          phone?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      company_vendor_associations: {
        Row: {
          company_id: string
          created_at: string | null
          id: string
          is_active: boolean | null
          vendor_id: string
        }
        Insert: {
          company_id: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          vendor_id: string
        }
        Update: {
          company_id?: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          vendor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "company_vendor_associations_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "company_vendor_associations_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendors"
            referencedColumns: ["id"]
          },
        ]
      }
      drivers: {
        Row: {
          address: string | null
          created_at: string | null
          email: string | null
          experience_years: number | null
          id: string
          is_active: boolean | null
          is_available: boolean | null
          license_expiry: string | null
          license_number: string
          name: string
          phone: string
          rating: number | null
          updated_at: string | null
          vendor_id: string
        }
        Insert: {
          address?: string | null
          created_at?: string | null
          email?: string | null
          experience_years?: number | null
          id?: string
          is_active?: boolean | null
          is_available?: boolean | null
          license_expiry?: string | null
          license_number: string
          name: string
          phone: string
          rating?: number | null
          updated_at?: string | null
          vendor_id: string
        }
        Update: {
          address?: string | null
          created_at?: string | null
          email?: string | null
          experience_years?: number | null
          id?: string
          is_active?: boolean | null
          is_available?: boolean | null
          license_expiry?: string | null
          license_number?: string
          name?: string
          phone?: string
          rating?: number | null
          updated_at?: string | null
          vendor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "drivers_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendors"
            referencedColumns: ["id"]
          },
        ]
      }
      user_profiles: {
        Row: {
          address: string | null
          company_name: string | null
          created_at: string | null
          email: string
          id: string
          phone: string | null
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string | null
          user_id: string
        }
        Insert: {
          address?: string | null
          company_name?: string | null
          created_at?: string | null
          email: string
          id?: string
          phone?: string | null
          role: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
          user_id: string
        }
        Update: {
          address?: string | null
          company_name?: string | null
          created_at?: string | null
          email?: string
          id?: string
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      vehicles: {
        Row: {
          capacity: number | null
          color: string | null
          created_at: string | null
          id: string
          insurance_expiry: string | null
          is_active: boolean | null
          is_available: boolean | null
          make: string
          model: string
          permit_expiry: string | null
          registration_number: string
          updated_at: string | null
          vehicle_type: Database["public"]["Enums"]["vehicle_type"]
          vendor_id: string
          year: number | null
        }
        Insert: {
          capacity?: number | null
          color?: string | null
          created_at?: string | null
          id?: string
          insurance_expiry?: string | null
          is_active?: boolean | null
          is_available?: boolean | null
          make: string
          model: string
          permit_expiry?: string | null
          registration_number: string
          updated_at?: string | null
          vehicle_type: Database["public"]["Enums"]["vehicle_type"]
          vendor_id: string
          year?: number | null
        }
        Update: {
          capacity?: number | null
          color?: string | null
          created_at?: string | null
          id?: string
          insurance_expiry?: string | null
          is_active?: boolean | null
          is_available?: boolean | null
          make?: string
          model?: string
          permit_expiry?: string | null
          registration_number?: string
          updated_at?: string | null
          vehicle_type?: Database["public"]["Enums"]["vehicle_type"]
          vendor_id?: string
          year?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "vehicles_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendors"
            referencedColumns: ["id"]
          },
        ]
      }
      vendors: {
        Row: {
          address: string | null
          contact_person: string | null
          created_at: string | null
          email: string | null
          id: string
          is_active: boolean | null
          license_number: string | null
          name: string
          phone: string | null
          rating: number | null
          service_areas: string[] | null
          total_bookings: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          address?: string | null
          contact_person?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          is_active?: boolean | null
          license_number?: string | null
          name: string
          phone?: string | null
          rating?: number | null
          service_areas?: string[] | null
          total_bookings?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          address?: string | null
          contact_person?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          is_active?: boolean | null
          license_number?: string | null
          name?: string
          phone?: string | null
          rating?: number | null
          service_areas?: string[] | null
          total_bookings?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_booking_number: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      update_booking_visibility: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
    }
    Enums: {
      booking_status:
        | "pending"
        | "accepted"
        | "rejected"
        | "ongoing"
        | "completed"
        | "cancelled"
      booking_visibility: "associated" | "open_market"
      user_role: "company" | "vendor"
      vehicle_type: "sedan" | "hatchback" | "suv" | "luxury"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      booking_status: [
        "pending",
        "accepted",
        "rejected",
        "ongoing",
        "completed",
        "cancelled",
      ],
      booking_visibility: ["associated", "open_market"],
      user_role: ["company", "vendor"],
      vehicle_type: ["sedan", "hatchback", "suv", "luxury"],
    },
  },
} as const
