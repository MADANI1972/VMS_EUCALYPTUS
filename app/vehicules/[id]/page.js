'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '../../../lib/supabaseClient';
import Link from 'next/link';

export default function VehiculeDetailPage() {
  const params = useParams();
  const [vehicule, setVehicule] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchVehicule();
  }, [params.id]);

  const fetchVehicule = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('vehicles')
        .select('*')
        .eq('id', params.id)
        .single();

      if (error) throw error;
      setVehicule(data);
    } catch (error) {
      console.error('Erreur:', error);
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
          <p>Chargement...</p>
        </div>
      </div>
    );
  }

  if (error || !vehicule) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Véhicule non trouvé</p>
          <Link href="/vehicules" className="text-blue-600 hover:underline">
            Retour à la liste
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <Link 
          href="/vehicules"
          className="inline-flex items-center text-gray-600 hover:text-red-600 mb-6 transition-colors"
        >
          <i className="ri-arrow-left-line mr-2"></i>
          Retour à la liste
        </Link>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="h-96 lg:h-auto">
              <img 
                src={vehicule.image_url} 
                alt={vehicule.model}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-8">
              <h1 className="text-4xl font-bold text-gray-800 mb-2">
                {vehicule.model}
              </h1>
              <p className="text-xl text-gray-500 mb-6">{vehicule.category}</p>

              {vehicule.description && (
                <p className="text-gray-700 mb-6 leading-relaxed">
                  {vehicule.description}
                </p>
              )}

              <div className="space-y-4 mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Caractéristiques
                </h2>

                {vehicule.autonomy && (
                  <div className="flex items-center border-b pb-3">
                    <i className="ri-battery-charging-line text-2xl text-green-600 mr-4"></i>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-700">Autonomie</p>
                      <p className="text-gray-600">{vehicule.autonomy} km</p>
                    </div>
                  </div>
                )}

                {vehicule.max_speed && (
                  <div className="flex items-center border-b pb-3">
                    <i className="ri-speed-line text-2xl text-blue-600 mr-4"></i>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-700">Vitesse maximale</p>
                      <p className="text-gray-600">{vehicule.max_speed} km/h</p>
                    </div>
                  </div>
                )}

                {vehicule.charging_time && (
                  <div className="flex items-center border-b pb-3">
                    <i className="ri-time-line text-2xl text-orange-600 mr-4"></i>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-700">Temps de charge</p>
                      <p className="text-gray-600">{vehicule.charging_time}</p>
                    </div>
                  </div>
                )}

                {vehicule.stock_quantity > 0 && (
                  <div className="flex items-center">
                    <i className="ri-archive-line text-2xl text-purple-600 mr-4"></i>
