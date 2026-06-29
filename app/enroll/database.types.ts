export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      enrollments: {
        Row: {
          agreed_electronic_records: boolean
          agreed_key_acknowledgements: boolean
          agreed_legal_terms: boolean
          agreed_member_agreement: boolean
          agreed_sms: boolean
          agreed_telehealth_consent: boolean
          billing_city: string | null
          billing_line1: string | null
          billing_line2: string | null
          billing_same_as_shipping: boolean
          billing_state: string | null
          billing_zip: string | null
          created_at: string
          email: string | null
          first_name: string | null
          id: string
          last_name: string | null
          member_agreement_version: string | null
          phone: string | null
          shipping_city: string | null
          shipping_line1: string | null
          shipping_line2: string | null
          shipping_state: string | null
          shipping_zip: string | null
          status: string
          telehealth_consent_version: string | null
          user_agent: string | null
        }
        Insert: {
          agreed_electronic_records?: boolean
          agreed_key_acknowledgements?: boolean
          agreed_legal_terms?: boolean
          agreed_member_agreement?: boolean
          agreed_sms?: boolean
          agreed_telehealth_consent?: boolean
          billing_city?: string | null
          billing_line1?: string | null
          billing_line2?: string | null
          billing_same_as_shipping?: boolean
          billing_state?: string | null
          billing_zip?: string | null
          created_at?: string
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          member_agreement_version?: string | null
          phone?: string | null
          shipping_city?: string | null
          shipping_line1?: string | null
          shipping_line2?: string | null
          shipping_state?: string | null
          shipping_zip?: string | null
          status?: string
          telehealth_consent_version?: string | null
          user_agent?: string | null
        }
        Update: {
          agreed_electronic_records?: boolean
          agreed_key_acknowledgements?: boolean
          agreed_legal_terms?: boolean
          agreed_member_agreement?: boolean
          agreed_sms?: boolean
          agreed_telehealth_consent?: boolean
          billing_city?: string | null
          billing_line1?: string | null
          billing_line2?: string | null
          billing_same_as_shipping?: boolean
          billing_state?: string | null
          billing_zip?: string | null
          created_at?: string
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          member_agreement_version?: string | null
          phone?: string | null
          shipping_city?: string | null
          shipping_line1?: string | null
          shipping_line2?: string | null
          shipping_state?: string | null
          shipping_zip?: string | null
          status?: string
          telehealth_consent_version?: string | null
          user_agent?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
