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

      // Upload nouvelle image si fichier sélectionné
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
          stock_quantity: parseInt(formData.stock_quantity),
          updated_at: new Date
