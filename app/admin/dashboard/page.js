import AdminNavbar from '@/components/AdminNavbar';
import { useEffect,useState } from 'react';
import supabase from '@/lib/supabaseClient';
export default function Dashboard(){
  const [products,setProducts]=useState([]);
  useEffect(()=>{ fetchProducts(); },[]);
  async function fetchProducts(){ const {data}=await supabase.from('products').select('*'); setProducts(data||[]); }
  async function deleteProduct(id){ await supabase.from('products').delete().eq('id',id); setProducts(products.filter(p=>p.id!==id)); }
  return (
    <div>
      <AdminNavbar/>
      <h2 className="text-2xl font-bold mb-4">Produits</h2>
      <table className="w-full border">
        <thead><tr><th>Nom</th><th>Description</th><th>Prix</th><th>Actions</th></tr></thead>
        <tbody>
          {products.map(p=><tr key={p.id}><td>{p.name}</td><td>{p.description}</td><td>{p.price}</td>
          <td><button onClick={()=>deleteProduct(p.id)} className="bg-red-500 text-white px-2">Supprimer</button></td></tr>)}
        </tbody>
      </table>
    </div>
  );
}