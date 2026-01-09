'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/api';
import { Trash2, Plus, Printer, QrCode } from 'lucide-react';
import QRCode from 'react-qr-code';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

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
    const { data } = await api.get('/tables');
    setTables(data);
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
      alert('Failed to add table (maybe duplicate?)');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure?')) return;
    try {
        await api.delete(`/tables/${id}`);
        fetchTables();
    } catch (error) {
        console.error(error);
        alert('Failed to delete table');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
           <h1 className="text-3xl font-bold tracking-tight">Tables & QR Codes</h1>
           <p className="text-muted-foreground mt-1">Manage cafe tables and print QR codes.</p>
        </div>
      </div>

      <Card className="max-w-md">
        <CardHeader>
           <CardTitle className="text-base">Add New Table</CardTitle>
        </CardHeader>
        <CardContent>
            <form onSubmit={handleAdd} className="flex gap-3">
                <div className="flex-1">
                    <Label htmlFor="tableNo" className="sr-only">Table Number</Label>
                    <Input
                        id="tableNo"
                        type="number"
                        value={newTableNo}
                        onChange={(e) => setNewTableNo(e.target.value)}
                        placeholder="Table Number (e.g. 1)"
                        required
                    />
                </div>
                <Button type="submit" className="bg-green-600 hover:bg-green-700">
                    <Plus className="w-4 h-4 mr-2" /> Add Table
                </Button>
            </form>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {tables.map((table) => (
            <Card key={table._id} className="overflow-hidden bg-white hover:shadow-md transition-all duration-200">
                <CardHeader className="bg-gray-50/50 py-4 flex flex-row items-center justify-between border-b border-gray-100">
                     <CardTitle className="text-lg font-bold flex items-center gap-2">
                        <span className="bg-black text-white h-7 w-7 rounded-md flex items-center justify-center text-sm">{table.tableNo}</span>
                        Table {table.tableNo}
                     </CardTitle>
                     <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                        onClick={() => handleDelete(table._id)} 
                     >
                        <Trash2 className="w-4 h-4" />
                     </Button>
                </CardHeader>
                <CardContent className="flex justify-center py-8">
                     <div className="bg-white p-2 border rounded-lg shadow-sm">
                        <QRCode 
                            value={`${typeof window !== 'undefined' ? window.location.origin : ''}/menu/${table.tableNo}`}
                            size={140}
                        />
                     </div>
                </CardContent>
                <CardFooter className="bg-gray-50/30 p-3 pt-0 flex gap-2">
                     <Button 
                        variant="secondary" 
                        className="w-full text-xs font-semibold"
                        onClick={() => window.open(`/menu/${table.tableNo}`, '_blank')}
                     >
                         <QrCode className="w-3.5 h-3.5 mr-2" />
                         Test Menu
                     </Button>
                </CardFooter>
            </Card>
        ))}
        {tables.length === 0 && (
            <div className="col-span-full py-12 text-center text-muted-foreground bg-gray-50 rounded-xl border border-dashed">
                <p>No tables added yet.</p>
            </div>
        )}
      </div>
    </div>
  );
}
