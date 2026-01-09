// app/menu/[tableId]/page.tsx
'use client';

import { useParams } from 'next/navigation';

export default function MenuPage() {
  const params = useParams();
  const tableId = params.tableId;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <header className="bg-white shadow-sm p-4 sticky top-0 z-10">
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-lg">Monkey Cafe</h1>
          <span className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full">
            Table {tableId}
          </span>
        </div>
      </header>

      <main className="p-4">
        {/* Popular Items Section */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">Popular Items 🔥</h2>
          <div className="flex gap-4 overflow-x-auto pb-4">
             {/* Placeholders */}
             <div className="min-w-[160px] bg-white p-3 rounded-lg shadow border">
               <div className="h-24 bg-gray-200 rounded mb-2"></div>
               <p className="font-medium">Caramel Latte</p>
               <p className="text-sm text-gray-500">$4.50</p>
             </div>
             <div className="min-w-[160px] bg-white p-3 rounded-lg shadow border">
               <div className="h-24 bg-gray-200 rounded mb-2"></div>
               <p className="font-medium">Croissant</p>
               <p className="text-sm text-gray-500">$3.00</p>
             </div>
          </div>
        </section>

        {/* Menu Categories */}
        <section>
          <h2 className="text-xl font-bold mb-4">Menu</h2>
          <div>
            <div className="bg-white p-4 rounded-lg shadow border mb-3 flex justify-between">
              <div>
                <h3 className="font-bold">Espresso</h3>
                <p className="text-sm text-gray-500 line-clamp-2">Rich and bold single shot.</p>
                <p className="mt-2 font-medium">$2.50</p>
              </div>
              <div className="w-24 h-24 bg-gray-200 rounded flex-shrink-0 ml-4"></div>
            </div>
            {/* More Items... */}
          </div>
        </section>
      </main>

      {/* Floating Cart Button */}
      <div className="fixed bottom-4 left-4 right-4">
        <button className="w-full bg-black text-white py-3 rounded-lg font-bold shadow-lg">
          View Cart (0)
        </button>
      </div>
    </div>
  );
}
