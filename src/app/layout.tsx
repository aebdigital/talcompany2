import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "TAL COMPANY - Stavebná firma Žilina | Komplexné stavebné služby",
  description: "TAL COMPANY s.r.o. - stavebná firma zo Žiliny s 18-ročnými skúsenosťami. Ponúkame komplexné stavebné služby, izolácie, hydroizolácie, výstavbu rodinných domov a inžinierske siete na Slovensku.",
  keywords: "stavebná firma Žilina, stavebné práce, izolácie, hydroizolácie, rodinné domy, inžinierske siete, stavebníctvo Slovensko, TAL COMPANY",
  authors: [{ name: "TAL COMPANY s.r.o." }],
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sk" className={`${montserrat.variable} h-full scroll-smooth`}>
      <body className="min-h-full flex flex-col font-sans antialiased bg-white text-brand-dark-gray">
        <Navbar />
        <main className="flex-grow flex flex-col bg-white">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
