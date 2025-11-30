import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientBody from "./ClientBody";
import Script from "next/script";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { DataProvider } from "@/contexts/DataContext";
import { AuthProvider } from "@/contexts/AuthContext";
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
  openGraph: {
    title: "Forever Pet Friend - Monumentos Virtuales para Mascotas",
    description: "Crea y comparte memorials eternos para tus mascotas queridas",
    url: baseUrl,
    siteName: "Forever Pet Friend",
    images: [
      {
        url: `${baseUrl}/api/og?title=Forever%20Pet%20Friend&type=landing`,
        width: 1200,
        height: 630,
        alt: "Forever Pet Friend - Memorials para mascotas"
      }
    ],
    type: "website",
    locale: "es_ES"
  },
  twitter: {
    card: "summary_large_image",
    title: "Forever Pet Friend - Monumentos Virtuales para Mascotas",
    description: "Crea y comparte memorials eternos para tus mascotas queridas",
    images: [`${baseUrl}/api/og?title=Forever%20Pet%20Friend&type=landing`],
    creator: "@foreverpetfriend"
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
    googleBot: "index, follow, max-snippet:-1, max-image-preview:large"
  },
  alternates: {
    canonical: baseUrl
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code"
  }
};

export default function RootLayout({
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
        {/* Canonical URL */}
        <CanonicalHead url={baseUrl} />

        {/* JSON-LD Schema Markup */}
        <SchemaHead schemas={[organizationSchema, webPageSchema]} />

        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://images.unsplash.com" />

        {/* DNS Prefetch for external services */}
        <link rel="dns-prefetch" href="https://api.stripe.com" />
        <link rel="dns-prefetch" href="https://cdn.jsdelivr.net" />

        {/* Favicon and PWA */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#8B7355" />

        <Script
          crossOrigin="anonymous"
          src="//unpkg.com/same-runtime/dist/index.global.js"
        />

        {/* Google Analytics */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXX"
        />
        <Script
          id="google-analytics"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XXXXX');
            `,
          }}
        />
      </head>
      <body suppressHydrationWarning className="antialiased">
        <AuthProvider>
          <DataProvider>
            <Navbar />
            <ClientBody>{children}</ClientBody>
            <Footer />
          </DataProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
