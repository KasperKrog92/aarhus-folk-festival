import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz", "SOFT"],
});

export const metadata: Metadata = {
  title: "Aarhus Folk Festival 2026 — Folkemusikken indtager Aarhus",
  description:
    "24.–27. september 2026. Fire dage fyldt med koncerter, dans, workshops og fællesskab midt i Aarhus.",
  openGraph: {
    title: "Aarhus Folk Festival 2026",
    description:
      "Fire dage fyldt med koncerter, dans, workshops og fællesskab midt i Aarhus.",
    locale: "da_DK",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="da"
      className={`${jakarta.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-cream text-ink">
        <a
          href="#indhold"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-petroleum focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-cream-50"
        >
          Spring til indhold
        </a>
        <Header />
        <main id="indhold" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
