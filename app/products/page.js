import { useState, useEffect } from 'react';
import supabase from '@/lib/supabaseClient';
import ProductCard from '@/components/ProductCard';
export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  useEffect(() => { fetchProducts(); }, []);
  async function fetchProducts() {
    const { data } = await supabase.from('products').select('*');
    setProducts(data || []);
  }
  return (
    <div>
      <h2 className="text-3xl font-bold mb-4">Nos produits</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  );
}