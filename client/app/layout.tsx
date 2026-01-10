import type { Metadata } from "next";
import { Inter, Playfair_Display, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: 'swap',
});

// Adding a clean sans font if needed, Outfit is very "modern app" like
const outfit = Outfit({
    subsets: ["latin"],
    variable: "--font-outfit",
    display: 'swap',
});

export const metadata: Metadata = {
  title: "Monkey Cafe | Premium Digital Menu",
  description: "Order your favorites instantly.",
};

import { CartProvider } from '@/context/CartContext';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} ${outfit.variable} font-sans antialiased bg-[#F9F6F2]`}>
        <CartProvider>
            {children}
        </CartProvider>
      </body>
    </html>
  );
}
