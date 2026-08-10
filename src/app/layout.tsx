import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bio-AI Centre of Excellence | Kerala Startup Mission",
  description: "Bio-AI Centre of Excellence by Kerala Startup Mission, Digital Hub, Kochi — supporting startups working at the intersection of AI, biotechnology, Ayurveda, spices, biodiversity and life sciences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${sora.variable} scroll-smooth antialiased`}
    >
      <body className="min-h-screen flex flex-col font-sans bg-[#F4F4F1] text-[#101010]">{children}</body>
    </html>
  );
}
