import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import SchemaMarkup from "@/components/SchemaMarkup";
import { ThemeProvider } from "@/components/ThemeProvider";
import FloatingCall from "@/components/FloatingCall";
import { SiteManifest } from "@/config/site-manifest";
import TabManager from "@/components/TabManager";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `${SiteManifest.businessName} | Professional ${SiteManifest.niche}`,
    template: `%s | ${SiteManifest.businessName}`,
  },
  description: SiteManifest.description,
  icons: {
    icon: [
      { url: '/logo.png', type: 'image/png' },
    ],
    shortcut: ['/logo.png'],
    apple: [
      { url: '/logo.png' },
    ],
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: SiteManifest.meta.themeColor },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": SiteManifest.meta.schemaType,
              "name": SiteManifest.businessName,
              "url": SiteManifest.url,
              "image": "/logo.png",
              "description": SiteManifest.description,
              "telephone": SiteManifest.phone,
              "priceRange": "$$",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": SiteManifest.location.split(',')[0].trim(),
                "addressRegion": SiteManifest.location.split(',')[1].trim(),
                "addressCountry": "US"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": SiteManifest.geo.lat,
                "longitude": SiteManifest.geo.lng
              },
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                  "opens": "08:00",
                  "closes": "20:00"
                }
              ],
              "areaServed": [
                { "@type": "City", "name": "Fayetteville" },
                { "@type": "City", "name": "Hope Mills" },
                { "@type": "City", "name": "Raeford" }
              ]
            })
          }}
        />
        <link rel="icon" href="/logo.png" type="image/png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
        data-build="v2.1-security-patch"
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
          <FloatingCall />
          <CookieBanner />
          <SchemaMarkup />
          <TabManager />
          {/* HighLevel Chat Widget Container */}
          <div id="ghl-chat-container"></div>
        </ThemeProvider>
      </body>
    </html>
  );
}
