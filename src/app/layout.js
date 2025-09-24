// src/app/layout.js

import { Inter } from "next/font/google";
import "./globals.css";
import { AppProvider } from "../context/AppProvider.js";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx"; 
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SkillSwap | Exchange Skills, Build Projects",
  description: "A platform to connect and swap skills with talented individuals.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-50`}> 
        <AppProvider>
          <Toaster position="top-center" />
          <Header />
          <main>
            {children}
          </main>
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}