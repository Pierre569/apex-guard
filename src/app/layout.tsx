import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import SchemaMarkup from "@/components/SchemaMarkup";
import { ThemeProvider } from "@/components/ThemeProvider";
import FloatingCall from "@/components/FloatingCall";
import { siteConfig } from "@/config/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ApexGuard Pest Control | Your Home, Our Fortress",
  description: "Raleigh's #1 High-Speed, Eco-Safe Pest Control. We're there in 60 minutes.",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
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
              "@type": "PestControlService",
              "name": siteConfig.name,
              "url": siteConfig.url,
              "image": siteConfig.ogImage,
              "description": siteConfig.description,
              "telephone": siteConfig.phone,
              "priceRange": "$$",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": siteConfig.address.street,
                "addressLocality": siteConfig.address.city,
                "addressRegion": siteConfig.address.state,
                "postalCode": siteConfig.address.zip,
                "addressCountry": "US"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "34.9723",
                "longitude": "-78.9567"
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
          {/* HighLevel Chat Widget Container */}
          <div id="ghl-chat-container"></div>
        </ThemeProvider>
      </body>
    </html>
  );
}
