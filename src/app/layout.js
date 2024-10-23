import "./globals.css";
import Navbar from "@/components/navbar";
import { Toaster } from "@/components/ui/toaster";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <div className="bg-slate-800 h-screen pt-20">{children}</div>
        <Toaster />
      </body>
    </html>
  );
}
