'use client';

export default function Service() {
  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Nos Services</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Maintenance</h2>
            <p className="text-gray-600">Service de maintenance pour vos véhicules</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Garantie</h2>
            <p className="text-gray-600">Tous nos véhicules sont garantis</p>
          </div>
        </div>
      </div>
    </div>
  );
}