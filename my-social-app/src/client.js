import { createClient } from '@supabase/supabase-js'

const URL = 'https://dnmezemrianopuyfthmv.supabase.co'
const KEY = 'sb_publishable_IIJWQlEPST_rq6TcUmegzA_nnQ7huBZ'

export const supabase = createClient(URL, KEY)