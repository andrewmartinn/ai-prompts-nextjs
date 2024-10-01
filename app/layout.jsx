import "@/styles/globals.css";
import { dmSans } from "@/styles/fonts";

export const metadata = {
  title: "Radius AI - Explore AI Inspired Ideas",
  description: "Discover, Share & Create AI-Driven Prompts using Radius AI.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${dmSans.className} antialiased`}>
        <div className="main">
          <div className="gradient" />
        </div>
        <main className="app">{children}</main>
      </body>
    </html>
  );
}
