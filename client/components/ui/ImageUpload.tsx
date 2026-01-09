'use client';

import { useState } from 'react';
import { Upload, X, Loader2, Image as ImageIcon } from 'lucide-react';
import axios from 'axios'; // Direct axios or use lib/api
import api from '@/lib/api';

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
    <div className="w-full">
        <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
        
        {value ? (
            <div className="relative w-32 h-32 rounded-lg border border-gray-200 overflow-hidden group">
                <img src={value} alt="Uploaded" className="w-full h-full object-cover" />
                <button
                    type="button"
                    onClick={() => onChange('')}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                >
                    <X className="w-4 h-4" />
                </button>
            </div>
        ) : (
             <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 hover:bg-gray-50 transition-colors relative">
                <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    disabled={uploading}
                />
                {uploading ? (
                    <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
                ) : (
                    <>
                        <ImageIcon className="w-8 h-8 text-gray-400 mb-2" />
                        <span className="text-sm text-gray-500 font-medium">Click to upload</span>
                        <span className="text-xs text-gray-400 mt-1">PNG, JPG, WEBP</span>
                    </>
                )}
             </div>
        )}
    </div>
  );
}
