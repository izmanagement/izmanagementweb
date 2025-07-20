// src/app/layout.js
import { Inter_Tight } from "next/font/google";
import "./globals.css";

const interTight = Inter_Tight({ subsets: ["latin"], weight: ["400", "500", "700"] });

export const metadata = {
  title: "IZMGMT Casting",
  description: "Formulario de casting para modelos",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={interTight.className}>{children}</body>
    </html>
  );
}