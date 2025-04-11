import type { Metadata } from "next";
import { Geist, Geist_Mono, Montserrat } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

// Import font dan assign ke variable
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// app/layout.tsx
export const metadata: Metadata = {
  title: "AGA Dev | Digital Space",
  description: "Welcome to The Digital Space of AGA Dev",
  icons: "/favico.ico",
  keywords: [
    "aga dev",
    "digital space",
    "ahmad ghulam azkiya",
    "lcnghulam",
    "my profile",
    "profile of aga dev",
  ],
  verification: {
    google: "p24qfEdTMTlahtU3hQxVU_txDQkifpoJH1xS4jmCmlw",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "AGA Dev | Digital Space",
    description: "Welcome to The Digital Space of AGA Dev",
    url: "https://aga.is-a.dev",
    siteName: "AGA Dev",
    images: [
      {
        url: "https://aga.is-a.dev/api/og?title=AGA%20Dev&subtitle=Digital%20Space", 
        width: 1200,
        height: 630,
        alt: "AGA Dev | Digital Space",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AGA Dev | Digital Space",
    description: "Welcome to The Digital Space of AGA Dev",
    images: [
      "https://aga.is-a.dev/api/og?title=AGA%20Dev&subtitle=Digital%20Space", 
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} antialiased`}
      >
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
