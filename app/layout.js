import '../styles/globals.css';
import Header from '../components/Header';

export const metadata = {
  title: 'SARL HAPPY CAR STORE - VMS',
  description: 'Système de gestion de véhicules électriques',
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        {/* RemixIcon CDN */}
        <link
          href="https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css"
          rel="stylesheet"
        />
        {/* Google Fonts - Pacifico */}
        <link
          href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <footer className="bg-gray-900 text-white py-8">
          <div className="container mx-auto px-4 text-center">
            <a 
              href="https://maps.app.goo.gl/VzTyuCbgWuFNfEDn9" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition-colors inline-flex items-center gap-2"
            >
              <i className="ri-map-pin-line"></i>
              Nous localiser
            </a>
            <p className="text-gray-400 text-sm mt-4">
              © 2024 SARL HAPPY CAR STORE. Tous droits réservés.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
