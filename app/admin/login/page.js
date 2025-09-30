'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import supabase from '@/lib/supabaseClient';
export default function AdminLogin() {
  const [email,setEmail]=useState(''); const [password,setPassword]=useState('');
  const router=useRouter();
  async function handleLogin(e){ e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email,password });
    if(!error) router.push('/admin/dashboard');
  }
  return (
    <form onSubmit={handleLogin} className="max-w-md mx-auto mt-10">
      <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} className="border p-2 w-full mb-2"/>
      <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} className="border p-2 w-full mb-2"/>
      <button className="bg-blue-500 text-white px-4 py-2 w-full">Login</button>
    </form>
  );
}
