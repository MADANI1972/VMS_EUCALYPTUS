'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter, useParams } from 'next/navigation';

export default function EditVehicule() {
  const params = useParams();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    model: '',
    category: '',
    price: '',
    autonomy: '',
    max_speed: '',
    charging_time: '',
    image_url: '',
    description: '',
    in_stock: true,
    stock_quantity: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    fetchVehicule();
  }, []);

  const fetchVehicule = async () => {
    try {
      const { data, error } = await supabase
        .from('vehicles')
        .select('*')
        .eq('id', params.id)
        .single();

      if (error) throw error;
      
      if (data) {
        setFormData({
          model: data.model || '',
          category: data.category || '',
          price: data.price || '',
          autonomy: data.autonomy || '',
          max_speed: data.max_speed || '',
          charging_time: data.charging_time || '',
          image_url: data.image_url || '',
          description: data.description || '',
          in_stock: data.in_stock,
          stock_quantity: data.stock_quantity || 0
        });
        setImagePreview(data.image_url);
      }
    } catch (error) {
      console.error('Erreur:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5000000) {
        setError('La taille de l\'image ne doit pas dépasser 5MB');
        return;
      }
      
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setError(null);
    }
  };

  const uploadImage = async () => {
    if (!imageFile) return null;

    try {
      setUploadingImage(true);
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `${fileName}`;

      const { data, error } = await supabase.storage
        .from('vehicle-images')
        .upload(filePath, imageFile, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from('vehicle-images')
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (error) {
      console.error('Erreur upload image:', error);
      throw new Error('Erreur lors de l\'upload de l\'image');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let imageUrl = formData.image_url;

      if (imageFile) {
        imageUrl = await uploadImage();
      }

      const { error } = await supabase
        .from('vehicles')
        .update({
          model: formData.model,
          category: formData.category,
          price: parseFloat(formData.price),
          autonomy: formData.autonomy ? parseInt(formData.autonomy) : null,
          max_speed: formData.max_speed ? parseInt(formData.max_speed) : null,
          charging_time: formData.charging_time,
          image_url: imageUrl,
          description: formData.description,
          in_stock: formData.in_stock,
          stock_quantity: parseInt(formData.stock_quantity)
        })
        .eq('id', params.id);

      if (error) throw error;

      router.push('/admin/dashboard');
    } catch (error) {
      console.error('Erreur:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !formData.model) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Chargement...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Modifier le véhicule
        </h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8 space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Modèle *
            </label>
            <input
              type="text"
              name="model"
              value={formData.model}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Catégorie *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
              required
            >
              <option value="">Sélectionner</option>
              <option value="Berline">Berline</option>
              <option value="SUV">SUV</option>
              <option value="SUV Premium">SUV Premium</option>
              <option value="SUV Compact">SUV Compact</option>
              <option value="Compacte">Compacte</option>
              <option value="Citadine">Citadine</option>
            </select>
          </div>
<div>
  <label className="block text-gray-700 font-medium mb-2">
    Catégorie *
  </label>
  <select
    name="category"
    value={formData.category}
    onChange={handleChange}
    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
    required
  >
    <option value="">Sélectionner</option>
    <option value="Moto">Moto</option>
    <option value="Scooter">Scooter</option>
    <option value="Vélo électrique">Vélo électrique</option>
  </select>
</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Prix (DA) *
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Autonomie (km)
              </label>
              <input
                type="number"
                name="autonomy"
                value={formData.autonomy}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Vitesse max (km/h)
              </label>
              <input
                type="number"
                name="max_speed"
                value={formData.max_speed}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Temps de charge
              </label>
              <input
                type="text"
                name="charging_time"
                value={formData.charging_time}
                onChange={handleChange}
                placeholder="ex: 8 heures"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
              />
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Image du véhicule</h3>
            
            {imagePreview && (
              <div className="mb-4">
                <img
                  src={imagePreview}
                  alt="Aperçu"
                  className="w-full h-64 object-cover rounded-lg border"
                />
              </div>
            )}
            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Charger nouvelle image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                />
              </div>

              <div className="text-center text-gray-500">- OU -</div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  URL de l'image
                </label>
                <input
                  type="url"
                  name="image_url"
                  value={formData.image_url}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                  disabled={imageFile !== null}
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Quantité en stock
              </label>
              <input
                type="number"
                name="stock_quantity"
                value={formData.stock_quantity}
                onChange={handleChange}
                min="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
              />
            </div>

            <div className="flex items-center pt-8">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="in_stock"
                  checked={formData.in_stock}
                  onChange={handleChange}
                  className="w-5 h-5 text-red-600 border-gray-300 rounded focus:ring-red-500"
                />
                <span className="ml-2 text-gray-700 font-medium">
                  En stock
                </span>
              </label>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading || uploadingImage}
              className="flex-1 bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:bg-gray-400"
            >
              {uploadingImage ? 'Upload...' : loading ? 'Mise à jour...' : 'Mettre à jour'}
            </button>
            <button
              type="button"
              onClick={() => router.push('/admin/dashboard')}
              disabled={loading || uploadingImage}
              className="flex-1 bg-gray-500 text-white py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors disabled:bg-gray-400"
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
