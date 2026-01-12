'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
    const router = useRouter();
    useEffect(() => {
        router.replace('/demo/admin/dashboard');
    }, [router]);

    return (
        <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#6F4E37]"></div>
        </div>
    );
}




