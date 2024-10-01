import "@/styles/globals.css";
import { radioCanada } from "@/styles/fonts";

import Navbar from "@/components/navbar";
import AuthProvider from "@/context/auth-provider";

export const metadata = {
  title: "Radius AI - Explore AI Inspired Ideas",
  description: "Discover, Share & Create AI-Driven Prompts using Radius AI.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${radioCanada.className} antialiased`}>
        <AuthProvider>
          <div className="main">
            <div className="gradient" />
          </div>
          <main className="app">
            <Navbar />
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
