'use client';

import AdminNavbar from '@/components/AdminNavbar';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';

export default function Dashboard() {
  const [vehicules, setVehicules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchVehicules();
  }, []);

  async function fetchVehicules() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('vehicles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setVehicules(data || []);
    } catch (error) {
      console.error('Erreur:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function deleteVehicule(id) {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce véhicule ?')) return;

    try {
      const { error } = await supabase
        .from('vehicles')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setVehicules(vehicules.filter(v => v.id !== id));
    } catch (error) {
      console.error('Erreur suppression:', error);
      alert('Erreur lors de la suppression');
    }
  }

  if (loading) {
    return (
      <div>
        <AdminNavbar />
        <div className="container mx-auto px-4 py-8">
          <p>Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">
            Gestion des Véhicules
          </h2>
          <Link
            href="/admin/add"
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
          >
            + Ajouter un véhicule
          </Link>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {vehicules.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-600 mb-4">Aucun véhicule trouvé</p>
            <Link
              href="/admin/add"
              className="text-green-600 hover:underline"
            >
              Ajouter votre premier véhicule
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100 border-b">
                  <tr>
                    <th className="text-left px-6 py-4 font-semibold text-gray-700">Image</th>
                    <th className="text-left px-6 py-4 font-semibold text-gray-700">Modèle</th>
                    <th className="text-left px-6 py-4 font-semibold text-gray-700">Catégorie</th>
                    <th className="text-left px-6 py-4 font-semibold text-gray-700">Prix</th>
                    <th className="text-left px-6 py-4 font-semibold text-gray-700">Stock</th>
                    <th className="text-left px-6 py-4 font-semibold text-gray-700">Statut</th>
                    <th className="text-center px-6 py-4 font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {vehicules.map(vehicule => (
                    <tr key={vehicule.id} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <img
                          src={vehicule.image_url}
                          alt={vehicule.model}
                          className="w-16 h-16 object-cover rounded"
                        />
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-800">
                        {vehicule.model}
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {vehicule.category}
                      </td>
                      <td className="px-6 py-4 text-gray-800 font-semibold">
                        {Number(vehicule.price).toLocaleString()} DA
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {vehicule.stock_quantity}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          vehicule.in_stock
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {vehicule.in_stock ? 'En stock' : 'Épuisé'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center gap-2">
                          <Link
                            href={`/admin/edit/${vehicule.id}`}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors text-sm"
                          >
                            Modifier
                          </Link>
                          <button
                            onClick={() => deleteVehicule(vehicule.id)}
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors text-sm"
                          >
                            Supprimer
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="mt-6 text-gray-600">
          <p>Total: {vehicules.length} véhicule{vehicules.length > 1 ? 's' : ''}</p>
        </div>
      </div>
    </div>
  );
}
