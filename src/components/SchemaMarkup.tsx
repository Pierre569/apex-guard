import Script from 'next/script';

interface SchemaProps {
    businessName?: string;
    address?: {
        street: string;
        city: string;
        state: string;
        zip: string;
    };
    geo?: {
        lat: string;
        lng: string;
    };
    telephone?: string;
}

export default function SchemaMarkup({
    businessName = "Apex Guard Pest Control",
    address = {
        street: "123 Market St",
        city: "Wilmington",
        state: "NC",
        zip: "28401"
    },
    geo = {
        lat: "34.2104",
        lng: "-77.8868" // Wilmington coords
    },
    telephone = "(910) 387-9259"
}: SchemaProps) {

    const schema = {
        "@context": "https://schema.org",
        "@type": "PestControlService",
        "name": businessName,
        "telephone": telephone,
        "address": {
            "@type": "PostalAddress",
            "streetAddress": address.street,
            "addressLocality": address.city,
            "addressRegion": address.state,
            "postalCode": address.zip
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": geo.lat,
            "longitude": geo.lng
        },
        "priceRange": "$$",
        "openingHours": "Mo-Fr 08:00-18:00",
        "areaServed": {
            "@type": "GeoCircle",
            "geoMidpoint": {
                "@type": "GeoCoordinates",
                "latitude": geo.lat,
                "longitude": geo.lng
            },
            "geoRadius": "32000" // 20 miles in meters
        },
        "makesOffer": [
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Termite Control" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Mosquito Control" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Bed Bug Removal" } }
        ]
    };

    return (
        <Script id="local-schema" type="application/ld+json" strategy="afterInteractive">
            {JSON.stringify(schema)}
        </Script>
    );
}
