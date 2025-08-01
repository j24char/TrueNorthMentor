
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ihxpobrhfobtyudjwkxw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImloeHBvYnJoZm9idHl1ZGp3a3h3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM3OTA5MzMsImV4cCI6MjA2OTM2NjkzM30.HMkM3AEqis1jhnb8DLRb9CgnLvEL1LW5klkM_C1nXIk';
export const supabase = createClient(supabaseUrl, supabaseKey)