import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Praveen Kumar S & Sri Arunachala Priya S — Our Wedding Invitation",
  description:
    "Our Wedding Invitation — Praveen Kumar S & Sri Arunachala Priya S. Reception 15 November 2026, Muhurtham 16 November 2026, Kettimelam Mahal, Coimbatore.",
  openGraph: {
    title: "Praveen Kumar S ❤️ Sri Arunachala Priya S",
    description: "Our Wedding Invitation",
    type: "website",
    images: [
      {
        url: "https://cdn.b12.io/client_media/1AjDam8X/2b31ae50-b498-11f1-83ba-0242ac110002-ASvAdMZ5pEy3BAWop5iHq_FtLJPBcN.jpg",
        width: 1200,
        height: 630,
        alt: "Praveen Kumar S & Sri Arunachala Priya S Wedding Invitation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Praveen Kumar S ❤️ Sri Arunachala Priya S",
    description: "Our Wedding Invitation",
    images: [
      "https://cdn.b12.io/client_media/1AjDam8X/2b31ae50-b498-11f1-83ba-0242ac110002-ASvAdMZ5pEy3BAWop5iHq_FtLJPBcN.jpg",
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable} bg-[#050505]`}>
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </head>
      <body className="bg-background text-foreground font-body antialiased overflow-x-clip m-0 p-0 selection:bg-gold/35 selection:text-ivory">
        {children}
      </body>
    </html>
  );
}
