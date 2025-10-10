'use client';

import Link from 'next/link';

export default function ServicePage() {
  const services = [
    {
      icon: 'ri-tools-line',
      title: 'Maintenance Préventive',
      description: 'Contrôle complet de votre véhicule selon le planning constructeur',
      duration: '1h30',
      price: 'Sur devis',
      bgColor: 'bg-red-50',
      iconColor: 'text-red-600',
      inclus: [
        'Contrôle des freins',
        'Vérification de la batterie',
        'Contrôle des pneumatiques',
        'Diagnostic électronique'
      ]
    },
    {
      icon: 'ri-battery-charge-line',
      title: 'Service Batterie',
      description: 'Diagnostic et maintenance de la batterie électrique',
      duration: '45min',
      price: 'Sur devis',
      bgColor: 'bg-red-50',
      iconColor: 'text-red-600',
      inclus: [
        'Test de capacité',
        'Vérification des connexions',
        'Nettoyage des bornes',
        'Rapport détaillé'
      ]
    },
    {
      icon: 'ri-settings-3-line',
      title: 'Réparation',
      description: 'Réparation de tous types de pannes et dysfonctionnements',
      duration: 'Variable',
      price: 'Sur devis',
      bgColor: 'bg-red-50',
      iconColor: 'text-red-600',
      inclus: [
        'Diagnostic complet',
        'Devis gratuit',
        'Pièces d origine',
        'Garantie réparation'
      ]
    },
    {
      icon: 'ri-refresh-line',
      title: 'Mise à Jour',
      description: 'Mise à jour logicielle et optimisation des performances',
      duration: '30min',
      price: 'Sur devis',
      bgColor: 'bg-red-50',
      iconColor: 'text-red-600',
      inclus: [
        'Mise à jour système',
        'Optimisation batterie',
        'Calibration moteur',
        'Configuration personnalisée'
      ]
    }
  ];

  const garanties = [
    {
      icon: 'ri-shield-check-line',
      title: 'Garantie Constructeur',
      description: 'Service gratuit pendant la période de garantie (2 ans)',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600'
    },
    {
      icon: 'ri-time-line',
      title: 'Intervention Rapide',
      description: 'Rendez-vous sous 48h maximum',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    {
      icon: 'ri-user-star-line',
      title: 'Techniciens Certifiés',
      description: 'Équipe formée et certifiée par VMS',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600'
    },
    {
      icon: 'ri-truck-line',
      title: 'Véhicule de Courtoisie',
      description: 'Disponible pour les interventions longues',
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Nos Services <span className="text-red-200">Professionnels</span>
          </h1>
          <p className="text-xl md:text-2xl text-red-100 max-w-3xl mx-auto">
            Une gamme complète de services pour maintenir votre véhicule VMS au top de ses performances
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
              <div className="p-8">
                <div className={`${service.bgColor} w-20 h-20 rounded-full flex items-center justify-center mb-6 mx-auto`}>
                  <i className={`${service.icon} text-4xl ${service.iconColor}`}></i>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-800 mb-3 text-center">
                  {service.title}
                </h3>
                
                <p className="text-gray-600 mb-6 text-center min-h-[48px]">
                  {service.description}
                </p>

                <div className="flex justify-between items-center mb-4 pb-4 border-b">
                  <span className="text-gray-500">Durée: {service.duration}</span>
                  <span className="text-2xl font-bold text-red-600">{service.price}</span>
                </div>

                <div className="mb-6">
                  <p className="font-semibold text-gray-800 mb-3">Inclus:</p>
                  <ul className="space-y-2">
                    {service.inclus.map((item, i) => (
                      <li key={i} className="flex items-start text-sm text-gray-600">
                        <i className="ri-check-line text-green-600 mr-2 mt-0.5"></i>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href="/contact"
                  className="block w-full bg-red-600 text-white text-center py-3 rounded-lg hover:bg-red-700 transition-colors font-semibold"
                >
                  Prendre rendez-vous
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4">
            Nos <span className="text-red-600">Garanties</span>
          </h2>
          <p className="text-xl text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Votre satisfaction et votre sécurité sont nos priorités
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {garanties.map((garantie, index) => (
              <div key={index} className="text-center">
                <div className={`${garantie.bgColor} w-24 h-24 rounded-full flex items-center justify-center mb-6 mx-auto`}>
                  <i className={`${garantie.icon} text-5xl ${garantie.iconColor}`}></i>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {garantie.title}
                </h3>
                <p className="text-gray-600">
                  {garantie.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
         <div className="bg-gradient-to-r from-red-600 to-red-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Besoin d un service ?
          </h2>
          <p className="text-xl mb-8 text-red-100 max-w-2xl mx-auto">
            Contactez-nous pour prendre rendez-vous
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-red-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Prendre rendez-vous
            </Link>
            
              href="tel:0550220589"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-red-600 transition-colors"
            >
              Appelez-nous
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
}
