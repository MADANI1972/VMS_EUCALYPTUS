import '../styles/globals.css';
export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        <header className="bg-gray-900 text-white py-4 text-center">
          <h1 className="text-2xl font-bold">SARL HAPPY CAR STORE</h1>
        </header>
        <main className="container mx-auto py-8">{children}</main>
        <footer className="bg-gray-900 text-white py-4 text-center">
          <a href="https://maps.app.goo.gl/VzTyuCbgWuFNfEDn9" target="_blank" className="text-blue-400 hover:underline">Nous localiser</a>
        </footer>
      </body>
    </html>
  );
}