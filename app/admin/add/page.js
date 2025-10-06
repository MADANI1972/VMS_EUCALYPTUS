'use client'

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
export default function Addvehicules(){
  const [name,setName]=useState(''); const [description,setDescription]=useState(''); const [price,setPrice]=useState('');
  const [file,setFile]=useState(null); const router=useRouter();
  async function addvehicules(e){ e.preventDefault();
    const { data:img } = await supabase.storage.from('vehicules-images').upload(Date.now()+"_"+file.name,file);
    const url=supabase.storage.from('vehicules-images').getPublicUrl(img.path).data.publicUrl;
    await supabase.from('vehiculess').insert({name,description,price,image_url:url});
    router.push('/admin/dashboard');
  }
  return (
    <form onSubmit={addvehicules} className="max-w-md mx-auto mt-10">
      <input value={name} onChange={e=>setName(e.target.value)} placeholder="Nom" className="border p-2 w-full mb-2"/>
      <textarea value={description} onChange={e=>setDescription(e.target.value)} placeholder="Description" className="border p-2 w-full mb-2"/>
      <input type="number" value={price} onChange={e=>setPrice(e.target.value)} placeholder="Prix" className="border p-2 w-full mb-2"/>
      <input type="file" onChange={e=>setFile(e.target.files[0])} className="border p-2 w-full mb-2"/>
      <button className="bg-green-500 text-white px-4 py-2 w-full">Ajouter</button>
    </form>
  );
}
