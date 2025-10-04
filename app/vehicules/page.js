'use client'
import { useState, useEffect } from 'react';
import supabase from '@/lib/supabaseClient';
import vehiculesCard from '@/components/vehiculesCard';
export default function vehiculessPage() {
  const [vehiculess, setvehiculess] = useState([]);
  useEffect(() => { fetchvehiculess(); }, []);
  async function fetchvehiculess() {
    const { data } = await supabase.from('vehiculess').select('*');
    setvehiculess(data || []);
  }
  return (
    <div>
      <h2 className="text-3xl font-bold mb-4">Nos produits</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {vehiculess.map(p => <vehiculesCard key={p.id} vehicules={p} />)}
      </div>
    </div>
  );
}
