import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { CartProvider } from "@/context/cart-context";
import { siteConfig } from "@/config/site";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald", display: "swap" });

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} | Muebles a medida en Paraguay`,
    template: `%s | ${siteConfig.name}`,
  },
  description: "Muebles de madera y hierro hechos a pedido. Elegí un modelo o pedí una cotización a medida.",
  metadataBase: new URL("https://example.com"), // TODO(cliente): reemplazar con el dominio final antes de publicar
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-PY" data-scroll-behavior="smooth" className={`${inter.variable} ${oswald.variable}`}>
      <body>
        <CartProvider>
          <a href="#contenido" className="skip-link">Saltar al contenido</a>
          <Header />
          {children}
          <Footer />
          <WhatsAppFloat />
        </CartProvider>
      </body>
    </html>
  );
}
