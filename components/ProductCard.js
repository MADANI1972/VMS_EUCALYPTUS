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
        <p className="text-sm text-gray-500 mb-3">{product.category}</p>
        
        {product.description && (
          <p className="text-gray-600 text-sm mb-4">{product.description}</p>
        )}

        {/* Caractéristiques techniques */}
        <div className="space-y-2 mb-4">
          {product.autonomy && (
            <div className="flex items-center text-sm text-gray-600">
              <i className="ri-battery-charging-line text-green-600 mr-2"></i>
              <span>Autonomie: {product.autonomy} km</span>
            </div>
          )}
          {product.max_speed && (
            <div className="flex items-center text-sm text-gray-600">
              <i className="ri-speed-line text-blue-600 mr-2"></i>
              <span>Vitesse max: {product.max_speed} km/h</span>
            </div>
          )}
          {product.charging_time && (
            <div className="flex items-center text-sm text-gray-600">
              <i className="ri-time-line text-orange-600 mr-2"></i>
              <span>Charge: {product.charging_time}</span>
            </div>
          )}
        </div>

        {/* Prix et stock */}
        <div className="border-t pt-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-2xl font-bold text-red-600">
              {Number(product.price).toLocaleString()} DA
            </p>
            {product.stock_quantity > 0 && (
              <span className="text-sm text-gray-500">
                {product.stock_quantity} disponible{product.stock_quantity > 1 ? 's' : ''}
              </span>
            )}
          </div>
          
          <span className={`inline-block w-full text-center px-3 py-2 rounded-lg text-sm font-medium ${
            product.in_stock 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {product.in_stock ? '✓ En stock' : '✗ Épuisé'}
          </span>
        </div>
      </div>
    </div>
  );
}
