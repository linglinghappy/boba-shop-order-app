import { createClient } from '@supabase/supabase-js'

const URL = 'https://bctwflokxeslbawxddyi.supabase.co'
const API_KEY = 'sb_publishable_oSiSKOkcTirk875BI5wbFA_VCzkLBil'

export const supabase = createClient(URL, API_KEY)
