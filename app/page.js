'use client'
import Link from 'next/link';
export default function Home() {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-4">Bienvenue</h2>
      <p className="mb-8">Découvrez notre sélection.</p>
      <Link href="/products" className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded">Voir produits</Link>
    </div>
  );
}
