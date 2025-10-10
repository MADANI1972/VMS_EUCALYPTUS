'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-red-600 to-red-700 text-white">
        <div className="container mx-auto px-4 py-20 md:py-32">
          <motion.div 
            className="max-w-3xl"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Bienvenue chez VMS EUCALYPTUS
            </motion.h1>

            <motion.p 
              className="text-xl md:text-2xl mb-8 text-red-100"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Votre partenaire de confiance pour les véhicules électriques
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <Link 
                href="/vehicules"
                className="inline-block bg-white text-red-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 text-center"
              >
                Découvrir nos véhicules
              </Link>
              <Link 
                href="/contact"
                className="inline-block bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-red-600 transition-all text-center"
              >
                Nous contacter
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Effets décoratifs animés */}
        <motion.div 
          className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/2"
          animate={{ scale: [1, 1.1, 1], opacity: [0.05, 0.1, 0.05] }}
          transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
        />
        <motion.div 
          className="absolute bottom-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full translate-y-1/2 -translate-x-1/2"
          animate={{ scale: [1, 1.15, 1], opacity: [0.05, 0.1, 0.05] }}
          transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
        />
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            Pourquoi choisir VMS ?
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: 'ri-car-line',
                title: 'Large sélection',
                text: 'Un vaste choix de véhicules électriques de qualité pour tous les besoins'
              },
              {
                icon: 'ri-customer-service-2-line',
                title: 'Service expert',
                text: 'Une équipe professionnelle à votre écoute pour vous accompagner'
              },
              {
                icon: 'ri-shield-check-line',
                title: 'Garantie qualité',
                text: 'Tous nos véhicules sont contrôlés et garantis pour votre tranquillité'
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
                  <i className={`${item.icon} text-3xl text-red-600`}></i>
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-800">{item.title}</h3>
                <p className="text-gray-600">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {[
              { value: '100+', label: 'Véhicules en stock' },
              { value: '500+', label: 'Clients satisfaits' },
              { value: '1+', label: "Années d'expérience" },
              { value: '6/7', label: 'Support client' },
            ].map((stat, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="text-4xl font-bold text-red-600 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-800 text-white">
        <motion.div 
          className="container mx-auto px-4 text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Prêt à passer à l'électrique ?
          </h2>
          <p className="text-xl mb-8 text-gray-300 max-w-2xl mx-auto">
            Découvrez notre gamme complète de scooters et motos et trouvez celui qui vous correspond
          </p>
          <motion.div whileHover={{ scale: 1.05 }}>
            <Link 
              href="/vehicules"
              className="inline-block bg-red-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-red-700 transition-all"
            >
              Voir tous les véhicules
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
