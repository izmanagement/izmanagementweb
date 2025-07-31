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
        {/* CÓDIGO DE GOOGLE ANALYTICS */}
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

        {/* INICIO DEL CÓDIGO DE META PIXEL */}
        <Script id="meta-pixel-script">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '917901933863300');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img height="1" width="1" style={{display: 'none'}}
          src="https://www.facebook.com/tr?id=917901933863300&ev=PageView&noscript=1"
          />
        </noscript>
        {/* FIN DEL CÓDIGO DE META PIXEL */}
      </head>
      <body className={interTight.className}>{children}</body>
    </html>
  );
}