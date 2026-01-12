"use client";

import React from 'react';

export function PhoneFrame({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-xl transition-all duration-500 ${className}`}>
      <div className="h-[32px] w-[3px] bg-gray-800 absolute -start-[17px] top-[72px] rounded-s-lg"></div>
      <div className="h-[46px] w-[3px] bg-gray-800 absolute -start-[17px] top-[124px] rounded-s-lg"></div>
      <div className="h-[46px] w-[3px] bg-gray-800 absolute -start-[17px] top-[178px] rounded-s-lg"></div>
      <div className="h-[64px] w-[3px] bg-gray-800 absolute -end-[17px] top-[142px] rounded-e-lg"></div>
      <div className="rounded-[2rem] overflow-hidden w-full h-full bg-white dark:bg-gray-800">
        <div className="w-full h-full overflow-y-auto scrollbar-hide">
            {children}
        </div>
      </div>
    </div>
  );
}

export function LaptopFrame({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[8px] rounded-t-xl h-[450px] max-w-[800px] w-full shadow-2xl transition-all duration-500 ${className}`}>
      <div className="rounded-lg overflow-hidden h-full bg-white dark:bg-gray-800">
         <div className="w-full h-full overflow-y-auto">
            {children}
         </div>
      </div>
      <div className="relative mx-auto bg-gray-900 dark:bg-gray-700 rounded-b-xl h-[24px] max-w-[850px] w-[105%] left-[-2.5%]"></div>
      <div className="relative mx-auto bg-gray-800 dark:bg-gray-800 rounded-b-xl h-[6px] max-w-[120px] w-full"></div>
    </div>
  );
}
