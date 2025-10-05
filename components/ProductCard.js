'use client';

export default function ProductCard({ product }) {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow">
      <img 
        src={product.image_url} 
        alt={product.model}
        className="w-full h-64 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-gray-800">{product.model}</h3>
        <p className="text-gray-600 mb-2">{product.category}</p>
        {product.description && (
          <p className="text-gray-600 mb-4">{product.description}</p>
        )}
        <div className="flex items-center justify-between">
          <p className="text-2xl font-bold text-red-600">{product.price.toLocaleString()} DA</p>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            product.in_stock 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {product.in_stock ? 'En stock' : 'Épuisé'}
          </span>
        </div>
      </div>
    </div>
  );
}
