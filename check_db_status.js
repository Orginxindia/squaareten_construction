import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://hgkwzltxliggqrrzvxzn.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_GvSxajxWMIZenNvVoABuwg_8aQh0rn8';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function check() {
  const { data: cols, error: colErr } = await supabase.from('bookings').select('*').limit(1);
  if (colErr) {
    console.error('Fetch error:', colErr);
  } else {
    console.log('Bookings columns:', cols.length > 0 ? Object.keys(cols[0]) : 'No records found');
  }

  const { data: bookings, error: bookErr } = await supabase.from('bookings').select('*');
  console.log('All Bookings:', bookings);
}

check();
