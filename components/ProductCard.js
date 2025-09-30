import Image from 'next/image';
const ProductCard = ({ product }) => (
  <div className="bg-white shadow-md rounded-lg p-4">
    <Image src={product.image_url} alt={product.name} width={500} height={500} className="w-full h-64 object-cover rounded-lg mb-4"/>
    <h3 className="text-xl font-bold mb-2">{product.name}</h3>
    <p className="text-gray-600 mb-4">{product.description}</p>
    <p className="text-lg font-bold">{product.price} DA</p>
  </div>
);
export default ProductCard;