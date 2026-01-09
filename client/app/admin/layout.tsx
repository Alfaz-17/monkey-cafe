export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar Placeholder */}
      <aside className="w-64 bg-white border-r hidden md:block">
        <div className="p-6">
          <h2 className="text-xl font-bold">Monkey Cafe</h2>
        </div>
        <nav className="mt-6 px-4 space-y-2">
            <a href="/admin/dashboard" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">Dashboard</a>
            <a href="/admin/menu" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">Menu Management</a>
            <a href="/admin/orders" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">Orders</a>
            <a href="/admin/tables" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">Tables</a>
        </nav>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}
