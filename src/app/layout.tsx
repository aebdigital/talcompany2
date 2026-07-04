import JsonLd from "../components/JsonLd";
import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CookieConsent } from "@/components/CookieConsent";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-montserrat",
});

const SITE_URL = "https://www.talcompany.sk";
const OG_IMAGE = `${SITE_URL}/sources/portfolio/HERO=EXTRA.jpg`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "TAL COMPANY – Stavebná firma Žilina | Komplexné stavebné služby",
    template: "%s | TAL COMPANY Žilina",
  },
  description:
    "TAL COMPANY s.r.o. – stavebná firma zo Žiliny s 18-ročnými skúsenosťami. Komplexné stavebné služby, zatepľovanie, hydroizolácie, výstavba rodinných domov a inžinierske siete na Slovensku.",
  applicationName: "TAL COMPANY",
  authors: [{ name: "TAL COMPANY s.r.o." }],
  generator: "Next.js",
  category: "Construction",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "sk_SK",
    url: SITE_URL,
    siteName: "TAL COMPANY",
    title: "TAL COMPANY – Stavebná firma Žilina",
    description:
      "Stavebná firma zo Žiliny s 18-ročnými skúsenosťami. Komplexné stavebné riešenia pre Slovensko aj Českú republiku.",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "TAL COMPANY – realizácia stavebných projektov" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "TAL COMPANY – Stavebná firma Žilina",
    description:
      "Komplexné stavebné služby, zatepľovanie, hydroizolácie, výstavba rodinných domov a inžinierske siete.",
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#1d4ed8",
  width: "device-width",
  initialScale: 1,
};

const ORG_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "GeneralContractor",
  "@id": `${SITE_URL}/#organization`,
  name: "TAL COMPANY s.r.o.",
  legalName: "TAL COMPANY, s.r.o.",
  description:
    "Stavebná firma zo Žiliny s 18-ročnými skúsenosťami. Komplexné stavebné, inžinierske a obchodné riešenia.",
  url: SITE_URL,
  image: OG_IMAGE,
  telephone: "+421903385297",
  email: "tal@talcompany.sk",
  priceRange: "€€",
  currenciesAccepted: "EUR",
  paymentAccepted: "Cash, Bank transfer",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Dolné Rudiny 41A",
    addressLocality: "Žilina",
    postalCode: "010 01",
    addressRegion: "Žilinský kraj",
    addressCountry: "SK",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 49.2167,
    longitude: 18.7406,
  },
  areaServed: [
    { "@type": "Country", name: "Slovensko" },
    { "@type": "Country", name: "Česká republika" },
  ],
  identifier: [
    { "@type": "PropertyValue", name: "IČO", value: "50992309" },
    { "@type": "PropertyValue", name: "DIČ", value: "2120553990" },
    { "@type": "PropertyValue", name: "IČ DPH", value: "SK2120553990" },
  ],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "16:00",
    },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Stavebné služby",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Servisné a udržiavacie práce" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Zatepľovanie budov" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Hydroizolácia stavieb a tunelov" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Stavby rodinných domov na kľúč" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Záhradná a krajinná architektúra" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Úpravy spevnených plôch a terénov" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Stavby inžinierskych sietí" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Developerská a obchodná činnosť" } },
    ],
  },
};

const WEBSITE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: "TAL COMPANY",
  inLanguage: "sk-SK",
  publisher: { "@id": `${SITE_URL}/#organization` },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sk" className={`${montserrat.variable} h-full scroll-smooth`}>
      <body className="min-h-full flex flex-col font-sans antialiased bg-white text-brand-dark-gray">
        <JsonLd />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_JSON_LD) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE_JSON_LD) }}
        />
        <Navbar />
        <main className="flex-grow flex flex-col bg-white">
          {children}
        </main>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
