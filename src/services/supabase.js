import { createClient } from '@supabase/supabase-js'

export const supabaseUrl = 'https://lllujxerdnxmekqmajlz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxsbHVqeGVyZG54bWVrcW1hamx6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM2MTkyNjcsImV4cCI6MjAyOTE5NTI2N30.SslORJX8eGe-hzTv9GVkY_ti8aUWPMhmuoeIdJ0OwHQ';

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;