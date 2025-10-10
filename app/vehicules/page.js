'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabaseClient';

export default function VehiculesPage() {
  const [vehicules, setVehicules] = useState([]);
  const [filteredVehicules, setFilteredVehicules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('recent');

  useEffect(() => {
    const fetchVehicules = async () => {
      try {
        const { data, error } = await supabase
          .from('vehicles')
          .select('id, name, price, image_url, description, category, in_stock, created_at')
          .eq('in_stock', true);

        if (error) throw error;
        setVehicules(data || []);
        setFilteredVehicules(data || []);
      } catch (err) {
        console.error('Erreur de chargement :', err);
      } finally {
        setLoading(false);
      }
    };
    fetchVehicules();
  }, []);

  // 🧮 Gestion du filtrage et tri
  useEffect(() => {
    let filtered = [...vehicules];

    if (filter !== 'all') {
      filtered = filtered.filter(v => v.category === filter);
    }

    if (sort === 'price_asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sort === 'price_desc') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sort === 'recent') {
      filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    }

    setFilteredVehicules(filtered);
  }, [filter, sort, vehicules]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Chargement des véhicules...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-16 px-6">
      <motion.div
        className="max-w-7xl mx-auto text-center mb-12"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-red-700 mb-4">
          Nos véhicules ⚡
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Explorez notre sélection de véhicules modernes, fiables et performants.
        </p>
      </motion.div>

      {/* 🧭 Barre de filtrage */}
      <motion.div
        className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12 max-w-6xl mx-auto bg-white shadow-md rounded-xl p-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex gap-3 flex-wrap justify-center">
          <button
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${filter === 'all'
              ? 'bg-red-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            onClick={() => setFilter('all')}
          >
            Tous
          </button>
          <button
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${filter === 'SUV'
              ? 'bg-red-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            onClick={() => setFilter('SUV')}
          >
            SUV
          </button>
          <button
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${filter === 'Citadine'
              ? 'bg-red-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            onClick={() => setFilter('Citadine')}
          >
            Citadine
          </button>
          <button
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${filter === 'Utilitaire'
              ? 'bg-red-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            onClick={() => setFilter('Utilitaire')}
          >
            Utilitaire
          </button>
        </div>

        {/* Tri */}
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
        >
          <option value="recent">Les plus récents</option>
          <option value="price_asc">Prix croissant</option>
          <option value="price_desc">Prix décroissant</option>
        </select>
      </motion.div>

      {/* 💫 Grille animée */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
        <AnimatePresence>
          {filteredVehicules.map((v, i) => (
            <motion.div
              key={v.id}
              layout
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-1"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              <div className="relative w-full h-56">
                <img
                  src={v.image_url}
                  alt={v.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6 text-center">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">{v.name}</h2>
                <p className="text-gray-600 mb-4 line-clamp-2">{v.description}</p>
                <p className="text-red-600 font-bold text-lg mb-4">
                  {v.price ? `${v.price.toLocaleString()} DA` : 'Prix sur demande'}
                </p>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-red-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-red-700 transition"
                >
                  Détails
                </motion.button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
