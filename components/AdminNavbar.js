import Link from 'next/link';
const AdminNavbar = () => (
  <nav className="bg-gray-800">
    <div className="max-w-7xl mx-auto px-4 flex justify-between h-16 items-center">
      <span className="text-white text-xl font-bold">Admin Dashboard</span>
      <div className="ml-10 flex space-x-4">
        <Link href="/admin/dashboard" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md">Dashboard</Link>
        <Link href="/admin/add" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md">Ajouter</Link>
      </div>
    </div>
  </nav>
);
export default AdminNavbar;