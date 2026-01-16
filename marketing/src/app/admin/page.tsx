"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Users, 
  Calendar, 
  Phone, 
  Store, 
  Clock, 
  LogOut, 
  Search,
  RefreshCcw,
  LayoutDashboard
} from "lucide-react";

interface TrialRequest {
  _id: string;
  restaurantName: string;
  contactNumber: string;
  preferredTime: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const [trials, setTrials] = useState<TrialRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const fetchTrials = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/trials");
      if (res.ok) {
        const data = await res.json();
        setTrials(data.trials);
      } else if (res.status === 401) {
        router.push("/admin/login");
      }
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTrials();
  }, []);

  const handleLogout = async () => {
    await fetch("/api/admin/login", { method: "DELETE" });
    router.push("/marketing");
    router.refresh();
  };

  const filteredTrials = trials.filter(t => 
    t.restaurantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.contactNumber.includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      {/* Top Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
              <LayoutDashboard className="text-white w-4 h-4" />
            </div>
            <h1 className="font-bold text-lg">Restaurant Trial Request</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={fetchTrials}
              className="p-2 text-gray-400 hover:text-gray-900 transition-colors"
            >
              <RefreshCcw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
            <button 
              onClick={handleLogout}
              className="text-sm font-bold text-gray-500 hover:text-red-600 flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="space-y-6">
          
          {/* Simple Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Total Requests</p>
              <p className="text-3xl font-bold">{trials.length}</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Requests Today</p>
              <p className="text-3xl font-bold">
                {trials.filter(t => new Date(t.createdAt).toDateString() === new Date().toDateString()).length}
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text"
              placeholder="Search by cafe name or phone number..."
              className="w-full bg-white border border-gray-200 rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Main Table */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Restaurant / Cafe</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Contact Number</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Preferred Time</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {isLoading ? (
                    Array.from({ length: 5 }).map((_, i) => (
                      <tr key={i} className="animate-pulse">
                        <td colSpan={4} className="px-6 py-6 h-16" />
                      </tr>
                    ))
                  ) : filteredTrials.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-12 text-center text-gray-400">
                        No requests found
                      </td>
                    </tr>
                  ) : (
                    filteredTrials.map((trial) => (
                      <tr 
                        key={trial._id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-6">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                              <Store className="w-5 h-5" />
                            </div>
                            <p className="font-bold text-sm">{trial.restaurantName}</p>
                          </div>
                        </td>
                        <td className="px-6 py-6">
                          <div className="flex items-center gap-2 text-sm">
                            <Phone className="w-4 h-4 text-gray-400" />
                            {trial.contactNumber}
                          </div>
                        </td>
                        <td className="px-6 py-6">
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="w-4 h-4 text-gray-400" />
                            {trial.preferredTime}
                          </div>
                        </td>
                        <td className="px-6 py-6">
                          <div className="flex flex-col text-sm">
                            <div className="flex items-center gap-2 font-bold text-gray-900 group-hover:text-black">
                              <Calendar className="w-4 h-4 text-gray-400 group-hover:text-black" />
                              {new Date(trial.createdAt).toLocaleDateString(undefined, {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                              })}
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-400 mt-1 ml-6">
                              {new Date(trial.createdAt).toLocaleTimeString(undefined, {
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: true
                              })}
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                Showing {filteredTrials.length} requests
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
