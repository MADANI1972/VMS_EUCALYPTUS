'use client';

import { useState, useEffect } from 'react';
import ProductCard from '../../components/ProductCard';
import { supabase } from '../../lib/supabaseClient';

export default function VehiculesPage() {
  const [vehicules, setVehicules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchVehicules();
  }, []);

  const fetchVehicules = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('vehicles')
        .select('*')
        .eq('in_stock', true)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setVehicules(data || []);
    } catch (error) {
      console.error('Erreur chargement véhicules:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p>Chargement des véhicules...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded max-w-md">
          <p className="font-bold">Erreur</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">
          Nos Véhicules
        </h1>
        
        {vehicules.length === 0 ? (
          <p className="text-center text-gray-600">Aucun véhicule disponible.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {vehicules.map(vehicule => (
              <ProductCard key={vehicule.id} product={vehicule} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
