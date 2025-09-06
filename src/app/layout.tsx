import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import PerformanceOptimizer from "@/components/layout/PerformanceOptimizer";
import Header from "@/components/layout/Header";
import { AuthProvider } from "@/contexts/AuthContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Amar Sheba Protiva - Unified Civic Tech Transparency Platform",
  description: "Empowering citizens, leaders, and donors through blockchain-backed transparency and AI-powered civic engagement in Bangladesh.",
  keywords: ["civic tech", "transparency", "blockchain", "Bangladesh", "citizen engagement", "government accountability"],
  authors: [{ name: "Amar Sheba Protiva Team" }],
  creator: "Amar Sheba Protiva",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://amarsheba.protiva.com",
    title: "Amar Sheba Protiva - Civic Tech Transparency Platform",
    description: "Blockchain-backed transparency platform for Bangladesh",
    siteName: "Amar Sheba Protiva",
  },
  twitter: {
    card: "summary_large_image",
    title: "Amar Sheba Protiva",
    description: "Civic Tech Transparency Platform for Bangladesh",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Bengali:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <AuthProvider>
          <PerformanceOptimizer />
          <Header />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
