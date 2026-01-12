'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { Lock, Mail } from 'lucide-react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const { data } = await api.post('/users/login', { email, password });

      localStorage.setItem('userInfo', JSON.stringify(data));
      router.push('/demo/admin/dashboard');

    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] font-['Outfit'] text-[#3E2723] flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
             <div className="h-14 w-14 bg-[#6F4E37] rounded-xl flex items-center justify-center text-white shadow-lg mx-auto mb-4">
                <Lock className="h-6 w-6" />
             </div>
             <h1 className="text-2xl font-bold tracking-tight text-[#3E2723]">Monkey Admin</h1>
             <p className="text-xs font-medium text-[#A68966] mt-1">Please sign in to continue</p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            {error && (
            <div className="p-3 mb-6 text-xs font-bold uppercase tracking-wider text-red-600 bg-red-50 rounded-lg border border-red-100">
                {error}
            </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-[#A68966] ml-1">Email Address</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                        <Mail className="w-4 h-4 text-gray-300" />
                    </div>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="block w-full pl-11 h-12 bg-gray-50 border-gray-100 rounded-lg text-sm font-medium placeholder:text-gray-300 focus:ring-2 focus:ring-[#6F4E37]/10 focus:border-[#6F4E37]/20 transition-all"
                        placeholder="admin@monkeycafe.com"
                        required
                    />
                </div>
            </div>

            <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-[#A68966] ml-1">Password</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                        <Lock className="w-4 h-4 text-gray-300" />
                    </div>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="block w-full pl-11 h-12 bg-gray-50 border-gray-100 rounded-lg text-sm font-medium placeholder:text-gray-300 focus:ring-2 focus:ring-[#6F4E37]/10 focus:border-[#6F4E37]/20 transition-all"
                        placeholder="••••••••"
                        required
                    />
                </div>
            </div>

            <button
                type="submit"
                className="w-full h-12 mt-2 text-white bg-[#6F4E37] rounded-lg font-bold uppercase tracking-widest text-[10px] shadow-md hover:bg-[#5D4037] active:scale-[0.98] transition-all"
            >
                Login to Console
            </button>
            </form>
        </div>
        
        <p className="text-center mt-8 text-[10px] font-bold text-[#A68966] uppercase tracking-widest opacity-40">
            Secure Access Portal
        </p>
      </div>
    </div>
  );
}
