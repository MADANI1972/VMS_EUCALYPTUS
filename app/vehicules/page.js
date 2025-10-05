'use client';

import { useState, useEffect } from 'react';
import ProductCard from '../../components/ProductCard';

export default function VehiculesPage() {
  const [vehicules, setVehicules] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Charger les véhicules depuis votre API
    // Pour l'instant, données de test
    setVehicules([
      {
        id: 1,
        model: 'Tesla Model 3',
        category: 'Berline',
        price: 45000,
        image_url: 'https://via.placeholder.com/400x300',
        in_stock: true
      },
      {
        id: 2,
        model: 'Nissan Leaf',
        category: 'Compacte',
        price: 32000,
        image_url: 'https://via.placeholder.com/400x300',
        in_stock: true
      }
    ]);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Chargement...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">
          Nos Véhicules
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {vehicules.map(vehicule => (
            <ProductCard key={vehicule.id} product={vehicule} />
          ))}
        </div>
      </div>
    </div>
  );
}
