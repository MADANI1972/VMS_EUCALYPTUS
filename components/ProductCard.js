import Image from 'next/image';
const vehiculesCard = ({ vehicules }) => (
  <div className="bg-white shadow-md rounded-lg p-4">
    <Image src={vehicules.image_url} alt={vehicules.name} width={500} height={500} className="w-full h-64 object-cover rounded-lg mb-4"/>
    <h3 className="text-xl font-bold mb-2">{vehicules.name}</h3>
    <p className="text-gray-600 mb-4">{vehicules.description}</p>
    <p className="text-lg font-bold">{vehicules.price} DA</p>
  </div>
);
export default vehiculesCard;