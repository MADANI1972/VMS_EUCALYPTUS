'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus('');

    const subject = encodeURIComponent(`Contact VMS - ${formData.name}`);
    const body = encodeURIComponent(
      `Nom: ${formData.name}\n` +
      `Email: ${formData.email}\n` +
      `Téléphone: ${formData.phone}\n\n` +
      `Message:\n${formData.message}`
    );

    window.location.href = `mailto:vmsleseucalyptus@gmail.com?subject=${subject}&body=${body}`;

    setStatus('Votre client email va s ouvrir');
    setLoading(false);

    setTimeout(() => {
      setFormData({ name: '', email: '', phone: '', message: '' });
      setStatus('');
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Contactez-nous
            </h1>
            <p className="text-xl text-gray-600">
              Nous sommes là pour répondre à toutes vos questions
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Envoyez-nous un message
              </h2>

              {status && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
                  {status}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Nom complet *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                    placeholder="Votre nom"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                    placeholder="votre.email@exemple.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                    placeholder="0550 22 05 89"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                    placeholder="Votre message..."
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-red-600 text-white py-4 rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:bg-gray-400"
                >
                  {loading ? 'Envoi...' : 'Envoyer le message'}
                </button>
              </form>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Nos coordonnées
                </h2>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-red-100 p-3 rounded-lg mr-4">
                      <i className="ri-phone-line text-2xl text-red-600"></i>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">Téléphone</h3>
                      <a href="tel:0550220589" className="text-gray-600 hover:text-red-600 block">
                        0550 22 05 88
                      </a>
                      <a href="tel:0550220589" className="text-gray-600 hover:text-red-600 block mt-1">
                        0550 22 05 89
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-red-100 p-3 rounded-lg mr-4">
                      <i className="ri-mail-line text-2xl text-red-600"></i>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">Email</h3>
                      <a 
                        href="mailto:vmsleseucalyptus@gmail.com" 
                        className="text-gray-600 hover:text-red-600 break-all"
                      >
                        vmsleseucalyptus@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-red-100 p-3 rounded-lg mr-4">
                      <i className="ri-map-pin-line text-2xl text-red-600"></i>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">Adresse</h3>
                      <a 
                        href="https://maps.app.goo.gl/VzTyuCbgWuFNfEDn9" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-red-600"
                      >
                        Chararba les Eucalyptus, Alger
                        <i className="ri-external-link-line ml-1"></i>
