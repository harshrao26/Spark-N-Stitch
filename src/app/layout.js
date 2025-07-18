"use client";

// import { Poppins } from 'next /font/google';
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SessionProvider } from "next-auth/react";

// const poppins = Poppins({ subsets: ['latin'], weight: ['400', '600'] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
      // className={`${poppins.variable} antialiased`}
      >
        <SessionProvider>
          <Navbar />

          {children}
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
