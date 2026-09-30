import { createClient } from '@supabase/supabase-js'
import { Database } from './supabase'

const supabaseUrl = "https://khajesudyoizlzvwnbsm.supabase.co";
const supabasePublishableKey = process.env.NEXT_PUBLIC_SUPABASE_KEY || process.env.EXPO_PUBLIC_SUPABASE_KEY || 'placeholder-anon-key-string';;
export const supabase = createClient<Database>(supabaseUrl, supabasePublishableKey);