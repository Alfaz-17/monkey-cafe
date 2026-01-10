'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/api';
import { Trash2, Plus, QrCode } from 'lucide-react';
import QRCode from 'react-qr-code';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Table {
  _id: string;
  tableNo: number;
  status: 'free' | 'occupied';
  isActive: boolean;
}

export default function TablesPage() {
  const [tables, setTables] = useState<Table[]>([]);
  const [newTableNo, setNewTableNo] = useState('');

  useEffect(() => {
    fetchTables();
  }, []);

  const fetchTables = async () => {
    try {
        const { data } = await api.get('/tables');
        setTables(data);
    } catch (error) {
        console.error('Failed to fetch tables:', error);
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTableNo) return;

    try {
      await api.post('/tables', { tableNo: Number(newTableNo) });
      setNewTableNo('');
      fetchTables();
    } catch (error) {
      console.error(error);
      alert('Failed to add table');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Remove this table and its unique QR code?')) return;
    try {
        await api.delete(`/tables/${id}`);
        fetchTables();
    } catch (error) {
        console.error(error);
        alert('Failed to delete table');
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 font-['Outfit']">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
            <h1 className="text-3xl font-black text-[#3E2723]">Tables</h1>
            <p className="text-xs font-medium text-[#A68966] mt-1">Manage physical table locations and QR codes</p>
        </div>
      </div>

      <Card className="max-w-md rounded-2xl border border-[#F0EDE8] shadow-sm">
        <div className="p-6">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#A68966] mb-4">Add New Table</h3>
            <form onSubmit={handleAdd} className="flex gap-3">
                <Input
                    type="number"
                    value={newTableNo}
                    onChange={(e) => setNewTableNo(e.target.value)}
                    placeholder="No. (e.g. 1)"
                    className="h-12 rounded-lg bg-[#FAF7F2] border-[#F0EDE8] text-sm font-bold"
                    required
                />
                <Button type="submit" className="h-12 px-6 bg-[#6F4E37] text-white rounded-lg font-bold uppercase text-[10px] tracking-widest">
                    <Plus className="w-4 h-4 mr-2" /> Add
                </Button>
            </form>
        </div>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <AnimatePresence mode='popLayout'>
            {tables.map((table) => (
                <motion.div 
                    layout
                    key={table._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <Card className="rounded-2xl border border-[#F0EDE8] shadow-sm hover:shadow-md transition-shadow overflow-hidden bg-white">
                        <div className="p-4 border-b border-gray-50 flex items-center justify-between">
                             <div className="flex items-center gap-3">
                                 <div className="h-10 w-10 bg-[#FAF7F2] rounded-lg flex items-center justify-center text-[#6F4E37] font-bold text-sm border border-[#F0EDE8]">
                                    {table.tableNo}
                                 </div>
                                 <span className="font-bold text-[#3E2723]">Table {table.tableNo}</span>
                             </div>
                             <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8 rounded-lg text-red-400 hover:text-red-600 hover:bg-red-50"
                                onClick={() => handleDelete(table._id)} 
                             >
                                <Trash2 className="w-4 h-4" />
                             </Button>
                        </div>
                        <div className="flex justify-center p-8">
                             <div className="bg-white p-4 rounded-xl shadow-inner border border-gray-100">
                                <QRCode 
                                    value={`${typeof window !== 'undefined' ? window.location.origin : ''}/menu/${table.tableNo}`}
                                    size={140}
                                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                                />
                             </div>
                        </div>
                        <div className="p-4 pt-0">
                             <Button 
                                variant="outline" 
                                className="w-full h-10 rounded-lg text-[#6F4E37] font-bold uppercase text-[9px] tracking-widest border-[#F0EDE8]"
                                onClick={() => window.open(`/menu/${table.tableNo}`, '_blank')}
                             >
                                 Open Menu
                             </Button>
                        </div>
                    </Card>
                </motion.div>
            ))}
        </AnimatePresence>
        
        {tables.length === 0 && (
            <div className="col-span-full py-20 text-center border-2 border-dashed border-[#F0EDE8] rounded-2xl">
                <QrCode className="w-12 h-12 mx-auto mb-4 text-[#A68966] opacity-30" />
                <p className="text-xs font-bold uppercase tracking-widest text-[#A68966]">No tables found</p>
            </div>
        )}
      </div>
    </div>
  );
}
