'use client';

import { useState } from 'react';
import { Upload, X, Loader2, Image as ImageIcon } from 'lucide-react';
import axios from 'axios'; // Direct axios or use lib/api
import api from '@/lib/api';
import { getImageUrl } from '@/lib/utils/resolveImage';
import { cn } from '@/lib/utils';

interface ImageUploadProps {
    value: string;
    onChange: (url: string) => void;
    label?: string;
}

export default function ImageUpload({ value, onChange, label = "Upload Image" }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    setUploading(true);
    try {
        const { data } = await api.post('/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        onChange(data.url);
    } catch (error) {
        console.error('Upload failed', error);
        alert('Upload failed');
    } finally {
        setUploading(false);
    }
  };

  return (
    <div className="w-full font-['Outfit']">
        {label && <label className="block text-[10px] font-bold uppercase tracking-widest text-[#A68966] mb-2 ml-1">{label}</label>}
        
        {value ? (
            <div className="relative w-full aspect-square rounded-xl border border-[#F0EDE8] overflow-hidden group shadow-sm bg-[#FAF7F2]">
                <img src={getImageUrl(value)} alt="Uploaded" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                        type="button"
                        onClick={() => onChange('')}
                        className="bg-white text-[#3E2723] rounded-lg px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest shadow-md"
                    >
                        Change Image
                    </button>
                </div>
            </div>
        ) : (
             <div className="border border-dashed border-[#F0EDE8] rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-[#FAF7F2] transition-colors relative aspect-square bg-white">
                <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    disabled={uploading}
                />
                {uploading ? (
                    <div className="flex flex-col items-center gap-2">
                        <Loader2 className="w-6 h-6 text-[#6F4E37] animate-spin" />
                        <span className="text-[10px] font-bold uppercase text-[#A68966]">Uploading...</span>
                    </div>
                ) : (
                    <div className="text-center">
                        <div className="w-12 h-12 rounded-lg bg-[#FAF7F2] flex items-center justify-center mx-auto mb-3 border border-gray-100">
                            <ImageIcon className="w-5 h-5 text-[#A68966]" />
                        </div>
                        <span className="text-xs font-bold text-[#3E2723] block">Select Image</span>
                        <span className="text-[9px] text-[#A68966] mt-1 block uppercase">JPG, PNG (Max 5MB)</span>
                    </div>
                )}
             </div>
        )}
    </div>
  );
}
