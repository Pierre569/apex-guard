import { SiteManifest } from "./site-manifest";

export const siteConfig = {
    name: SiteManifest.businessName,
    description: SiteManifest.meta.defaultDescription,
    url: "https://apex-guard.vercel.app",
    ogImage: "https://apex-guard.vercel.app/og-image.jpg",
    phone: SiteManifest.phone,
    phoneLink: `tel:${SiteManifest.phone.replace(/\D/g, '')}`,
    email: SiteManifest.email,
    address: {
        street: "Service Area",
        city: SiteManifest.address.split(',')[0],
        state: "NC",
        zip: "28348",
        country: "US"
    },
    location: "Fayetteville, Hope Mills, and surrounding NC areas",
    links: {
        twitter: "https://twitter.com/apexguard",
        github: "https://github.com/apexguard",
    },
    features: SiteManifest.features,
    aiName: SiteManifest.aiName
};
