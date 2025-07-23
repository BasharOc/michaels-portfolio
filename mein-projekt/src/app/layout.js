import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Michael Müller – Portfolio Webentwickler",
  description:
    "Portfolio von Michael Müller, moderner Frontend Developer aus Lüneburg. Projekte, Skills, Kontakt.",
  keywords: ["Webentwicklung", "Portfolio", "React", "Next.js", "Lüneburg"],
  openGraph: {
    title: "Michael Müller – Portfolio Webentwickler",
    description:
      "Portfolio von Michael Müller, moderner Frontend Developer aus Lüneburg.",
    url: "https://deinedomain.de",
    siteName: "Michael Müller Portfolio",
    images: [
      {
        url: "/og-image.png", // Im /public Ordner ablegen
        width: 1200,
        height: 630,
        alt: "Portfolio von Michael Müller",
      },
    ],
    locale: "de_DE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Michael Müller – Portfolio Webentwickler",
    description:
      "Portfolio von Michael Müller, moderner Frontend Developer aus Lüneburg.",
    images: ["/og-image.png"],
  },
  robots: "index, follow",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
