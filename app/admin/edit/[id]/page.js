'use client'
import { useState,useEffect } from 'react';
import supabase from '@/lib/supabaseClient'; import { useRouter } from 'next/navigation';
export default function EditProduct({params}){
  const [name,setName]=useState(''); const [description,setDescription]=useState(''); const [price,setPrice]=useState('');
  const router=useRouter();
  useEffect(()=>{ fetchProduct(); },[]);
  async function fetchProduct(){ const {data}=await supabase.from('products').select('*').eq('id',params.id).single(); if(data){ setName(data.name); setDescription(data.description); setPrice(data.price); } }
  async function updateProduct(e){ e.preventDefault(); await supabase.from('products').update({name,description,price}).eq('id',params.id); router.push('/admin/dashboard'); }
  return (
    <form onSubmit={updateProduct} className="max-w-md mx-auto mt-10">
      <input value={name} onChange={e=>setName(e.target.value)} className="border p-2 w-full mb-2"/>
      <textarea value={description} onChange={e=>setDescription(e.target.value)} className="border p-2 w-full mb-2"/>
      <input type="number" value={price} onChange={e=>setPrice(e.target.value)} className="border p-2 w-full mb-2"/>
      <button className="bg-yellow-500 text-white px-4 py-2 w-full">Mettre à jour</button>
    </form>
  );
}
