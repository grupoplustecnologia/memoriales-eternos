import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import ClientBody from "../ClientBody";
import Script from "next/script";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SchemaHead } from "@/components/SchemaHead";
import { CanonicalHead } from "@/components/CanonicalHead";
import { generateOrganizationSchema, generateWebPageSchema } from "@/lib/schema";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const baseUrl = "https://memorias-eternas.app";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "Forever Pet Friend - Monumentos Virtuales para tus Mascotas Queridas",
  description: "Crea memorials virtuales eternos para tus mascotas. Comparte historias, tributos y recuerdos en una comunidad global de amantes de animales.",
  keywords: "memorial mascotas, memorial perros, memorial gatos, monumentos virtuales, mascotas fallecidas",
  viewport: "width=device-width, initial-scale=1.0, viewport-fit=cover, maximum-scale=5",
  themeColor: "#8B7355",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Forever Pet Friend",
  },
  formatDetection: {
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
};

export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = generateOrganizationSchema();
  const webPageSchema = generateWebPageSchema(
    metadata.title as string,
    metadata.description as string,
    baseUrl,
    `${baseUrl}/api/og?title=Forever%20Pet%20Friend&type=landing`
  );

  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <CanonicalHead url={baseUrl} />
        <SchemaHead schemas={[organizationSchema, webPageSchema]} />
        
        {/* Preconnect to external services */}
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://cdn.jsdelivr.net" />
        
        {/* Google Analytics */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=G-YOUR-ID`}
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-YOUR-ID');
            `,
          }}
        />
      </head>

      <body className="bg-background">
        <ClientBody>
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </ClientBody>
      </body>
    </html>
  );
}
