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
  title: "Bashar F – Portfolio Web Developer",
  description:
    "Portfolio of Bashar, a modern frontend developer based in Lüneburg. Projects, skills, contact information.",
  keywords: ["Web development", "Portfolio", "React", "Next.js", "Lüneburg"],
  openGraph: {
    title: "Bashar – Portfolio Web Developer",
    description:
      "Portfolio of Michael Müller, a modern frontend developer based in Lüneburg.",
    url: "https://yourdomain.com", // Change to your real domain
    siteName: "Bashar Portfolio",
    images: [
      {
        url: "/og-image.png", // Place in your /public folder
        width: 1200,
        height: 630,
        alt: "Portfolio of Bashar",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bashar – Portfolio Web Developer",
    description:
      "Portfolio of Bashar, a modern frontend developer based in Lüneburg.",
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
