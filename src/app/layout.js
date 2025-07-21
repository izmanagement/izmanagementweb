// src/app/layout.js
import { Inter_Tight } from "next/font/google";
import Script from 'next/script'; // Importamos el componente de Script
import "./globals.css";

const interTight = Inter_Tight({ subsets: ["latin"], weight: ["400", "500", "700"] });

export const metadata = {
  title: "IZMGMT Casting",
  description: "Formulario de casting para modelos",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        {/* INICIO DEL CÓDIGO DE GOOGLE ANALYTICS */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-T9FHD55TVL"
        />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-T9FHD55TVL');
          `}
        </Script>
        {/* FIN DEL CÓDIGO DE GOOGLE ANALYTICS */}
      </head>
      <body className={interTight.className}>{children}</body>
    </html>
  );
}