import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Playfair_Display } from "next/font/google";
import { Inter } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Preston Schlagheck | Finance & Computer Science Portfolio",
  description: "Finance & Computer Science Student at University of South Carolina's Darla Moore School of Business. Based in Guilford, Connecticut.",
  keywords: ["finance", "computer science", "portfolio", "student", "University of South Carolina", "Preston Schlagheck", "Darla Moore School of Business"],
  authors: [{ name: "Preston Schlagheck" }],
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://prestonschlagheck.com/",
    title: "Preston Schlagheck | Finance & CS Portfolio",
    description: "Finance & Computer Science Student at University of South Carolina",
    siteName: "Preston Schlagheck Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Preston Schlagheck | Finance & CS Portfolio",
    description: "Finance & Computer Science Student at University of South Carolina",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        <meta name="theme-color" content="#161616" />
      </head>
      <body
        className={`${geist.variable} ${playfair.variable} ${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}


