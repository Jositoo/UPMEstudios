import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "UPM Study Tracker",
  description: "Gestor de tiempo y estudio para estudiantes de la UPM",
};

import Sidebar from "../components/Sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <div className="app-container">
          <Sidebar />
          <main className="main-content">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
