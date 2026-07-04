'use client';

export default function JsonLd() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "TALCOMPANY",
    "url": "https://talcompany.sk",
    "telephone": "+421 903 385 297",
    "email": "tal@talcompany.sk",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "010 01",
      "addressCountry": "SK"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
