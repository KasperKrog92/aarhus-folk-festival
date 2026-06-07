import type { Metadata, Viewport } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LocaleProvider } from "@/i18n/LocaleProvider";
import { getDictionary } from "@/i18n/dictionaries";
import { getLocale } from "@/i18n/server";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { getTheme } from "@/lib/theme-server";
import { site } from "@/data/site";

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

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#134e57" },
    { media: "(prefers-color-scheme: dark)", color: "#17120f" },
  ],
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const title = `${site.name} ${site.year} — ${site.tagline[locale]}`;
  const description = `${site.tagline[locale]}. ${site.dates[locale]}. ${site.intro[locale]}`;
  const ogAlt = `${site.name} ${site.year} — ${site.dates[locale]}`;

  return {
    metadataBase: new URL(site.url),
    title: {
      default: title,
      template: `%s | ${site.name}`,
    },
    description,
    alternates: { canonical: "/" },
    openGraph: {
      title,
      description,
      url: "/",
      siteName: site.name,
      locale: locale === "da" ? "da_DK" : "en_DK",
      type: "website",
      images: [
        {
          url: "/images/opengraph.png",
          width: 1200,
          height: 630,
          alt: ogAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/opengraph.png"],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const theme = await getTheme();
  const t = getDictionary(locale);

  return (
    <html
      lang={locale}
      data-scroll-behavior="smooth"
      className={`${jakarta.variable} ${fraunces.variable} h-full antialiased${theme === "dark" ? " dark" : ""}`}
    >
      <body className="flex min-h-full flex-col bg-surface text-content">
        <LocaleProvider initialLocale={locale}>
          <ThemeProvider initialTheme={theme}>
            <a
              href="#indhold"
              className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-petroleum focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-cream-50"
            >
              {t.skipLink}
            </a>
            <Header />
            <main id="indhold" className="flex-1">
              {children}
            </main>
            <Footer />
          </ThemeProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
