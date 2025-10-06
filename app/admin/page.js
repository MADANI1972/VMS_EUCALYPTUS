'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    // Rediriger automatiquement vers login ou dashboard
    router.push('/admin/login');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p>Redirection...</p>
    </div>
  );
}
