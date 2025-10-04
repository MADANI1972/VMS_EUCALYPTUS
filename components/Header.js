'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">V</span>
              </div>
              <span className="font-['Pacifico'] text-2xl text-gray-800">VMS</span>
            </Link>
            
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-700 hover:text-red-600 transition-colors">Accueil</Link>
              <Link href="/vehicules" className="text-gray-700 hover:text-red-600 transition-colors">Véhicules</Link>
              <Link href="/service" className="text-gray-700 hover:text-red-600 transition-colors">Service</Link>
              <Link href="/contact" className="text-gray-700 hover:text-red-600 transition-colors">Contact</Link>
              <Link href="/admin" className="text-gray-700 hover:text-red-600 transition-colors">Admin</Link>
            </div>
          </nav>
        </div>
      </header>
    );
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-100">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">V</span>
            </div>
            <span className="font-['Pacifico'] text-2xl text-gray-800">VMS</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-red-600 transition-colors">Accueil</Link>
            <Link href="/vehicules" className="text-gray-700 hover:text-red-600 transition-colors">Véhicules</Link>
            <Link href="/service" className="text-gray-700 hover:text-red-600 transition-colors">Service</Link>
            <Link href="/contact" className="text-gray-700 hover:text-red-600 transition-colors">Contact</Link>
            <Link href="/admin" className="text-gray-700 hover:text-red-600 transition-colors">Admin</Link>
          </div>

          <div className="flex items-center space-x-4">
            <button 
              className="md:hidden text-gray-700 w-8 h-8 flex items-center justify-center"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <i className="ri-menu-line text-xl"></i>
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-100 md:hidden z-50">
              <div className="container mx-auto px-4 py-4 space-y-4">
                <Link href="/" className="block text-gray-700 hover:text-red-600 transition-colors">Accueil</Link>
                <Link href="/vehicules" className="block text-gray-700 hover:text-red-600 transition-colors">Véhicules</Link>
                <Link href="/service" className="block text-gray-700 hover:text-red-600 transition-colors">Service</Link>
                <Link href="/contact" className="block text-gray-700 hover:text-red-600 transition-colors">Contact</Link>
                <Link href="/admin" className="block text-gray-700 hover:text-red-600 transition-colors">Admin</Link>
              </div>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
