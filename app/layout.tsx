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
  metadataBase: new URL("https://wedding-invitation-blond-seven.vercel.app"),
  title: "Praveen Kumar S & Sri Arunachala Priya S — Wedding Invitation",
  description:
    "With the blessings of our Families, We are delighted to invite you and your family to celebrate our special day with us. Reception: 15 Nov 2026, Muhurtham: 16 Nov 2026 at Kettimelam Mahal, Coimbatore.",
  openGraph: {
    title: "Praveen Kumar S ❤️ Sri Arunachala Priya S — Wedding Invitation",
    description:
      "With the blessings of our Families, We are delighted to invite you and your family to celebrate our special day with us. Reception: 15 Nov 2026, Muhurtham: 16 Nov 2026 at Kettimelam Mahal, Coimbatore.",
    url: "https://wedding-invitation-blond-seven.vercel.app",
    siteName: "Praveen & Priya Wedding",
    type: "website",
    images: [
      {
        url: "https://wedding-invitation-blond-seven.vercel.app/images/og_wedding_invitation.jpg",
        width: 1200,
        height: 630,
        alt: "Praveen Kumar S & Sri Arunachala Priya S Wedding Invitation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Praveen Kumar S ❤️ Sri Arunachala Priya S — Wedding Invitation",
    description:
      "With the blessings of our Families, We are delighted to invite you and your family to celebrate our special day with us. Reception: 15 Nov 2026, Muhurtham: 16 Nov 2026 at Kettimelam Mahal, Coimbatore.",
    images: [
      "https://wedding-invitation-blond-seven.vercel.app/images/og_wedding_invitation.jpg",
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
