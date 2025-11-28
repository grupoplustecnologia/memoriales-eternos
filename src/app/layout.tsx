import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientBody from "./ClientBody";
import Script from "next/script";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { DataProvider } from "@/contexts/DataContext";
import { AuthProvider } from "@/contexts/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Forever Pet Friend - Monumentos Virtuales para tus Mascotas Queridas",
  description: "Crea memorials virtuales eternos para tus mascotas. Comparte historias, tributos y recuerdos en una comunidad global de amantes de animales.",
  keywords: "memorial mascotas, memorial perros, memorial gatos, monumentos virtuales, mascotas fallecidas",
  openGraph: {
    title: "Forever Pet Friend - Monumentos Virtuales para Mascotas",
    description: "Crea y comparte memorials eternos para tus mascotas queridas",
    url: "https://memorias-eternas.app",
    siteName: "Forever Pet Friend",
    images: [
      {
        url: "https://memorias-eternas.app/og-home.jpg",
        width: 1200,
        height: 630,
        alt: "Forever Pet Friend - Memorials para mascotas"
      }
    ],
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Forever Pet Friend - Monumentos Virtuales para Mascotas",
    description: "Crea y comparte memorials eternos para tus mascotas queridas",
    images: ["https://memorias-eternas.app/og-home.jpg"]
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1
  },
  alternates: {
    canonical: "https://memorias-eternas.app"
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
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <Script
          crossOrigin="anonymous"
          src="//unpkg.com/same-runtime/dist/index.global.js"
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
