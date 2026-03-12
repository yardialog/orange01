import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://orange-mood.ru"),
  title: "Оранжевое настроение — Музыкальная школа в Уфе | Вокал, Гитара, Барабаны, Фортепиано, DJ",
  description: "Музыкальная школа для детей и взрослых в микрорайоне Яркий (Уфа). Научим петь и играть на инструментах даже если ребенок никогда не занимался музыкой. Опытные преподаватели, маленькие группы, пробное занятие бесплатно.",
  keywords: [
    "музыкальная школа Уфа",
    "вокал Уфа",
    "гитара обучение Уфа",
    "барабаны Уфа",
    "фортепиано уроки Уфа",
    "DJ школа Уфа",
    "творческий центр Уфа",
    "музыка для детей Уфа",
    "музыкальные курсы Уфа",
    "пробное занятие музыка",
    "микрорайон Яркий Уфа",
    "Оранжевое настроение",
  ],
  authors: [{ name: "Оранжевое настроение" }],
  creator: "Оранжевое настроение",
  publisher: "Оранжевое настроение",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "https://orange-mood.ru",
    siteName: "Оранжевое настроение",
    title: "Оранжевое настроение — Музыкальная школа в Уфе",
    description: "Музыкальная школа для детей и взрослых в микрорайоне Яркий (Уфа). Научим петь и играть на инструментах. Пробное занятие бесплатно!",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Оранжевое настроение — Музыкальная школа в Уфе",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Оранжевое настроение — Музыкальная школа в Уфе",
    description: "Музыкальная школа для детей и взрослых в микрорайоне Яркий (Уфа). Пробное занятие бесплатно!",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://orange-mood.ru",
  },
  verification: {
    google: "google-site-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="theme-color" content="#f97316" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MusicSchool",
              name: "Оранжевое настроение",
              description: "Музыкальная школа для детей и взрослых в микрорайоне Яркий (Уфа)",
              url: "https://orange-mood.ru",
              telephone: "+7 917 907 07 89",
              email: "info@orange-mood.ru",
              address: {
                "@type": "PostalAddress",
                streetAddress: "ул. Архитектора Калимуллина, д.1",
                addressLocality: "Уфа",
                addressRegion: "Республика Башкортостан",
                postalCode: "450000",
                addressCountry: "RU",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 54.7431,
                longitude: 55.9678,
              },
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                  opens: "10:00",
                  closes: "21:00",
                },
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: ["Saturday", "Sunday"],
                  opens: "10:00",
                  closes: "18:00",
                },
              ],
              priceRange: "$$",
              image: "https://orange-mood.ru/og-image.jpg",
              sameAs: [
                "https://t.me/orange_mood_ufa",
                "https://vk.com/orange_mood_ufa",
              ],
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Направления обучения",
                itemListElement: [
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Course",
                      name: "Вокал",
                      description: "Обучение вокалу для детей и взрослых",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Course",
                      name: "Гитара",
                      description: "Обучение игре на гитаре",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Course",
                      name: "Барабаны",
                      description: "Обучение игре на ударных инструментах",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Course",
                      name: "Фортепиано",
                      description: "Обучение игре на фортепиано",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Course",
                      name: "DJ",
                      description: "Обучение диджеингу",
                    },
                  },
                ],
              },
            }),
          }}
        />
      </head>
      <body
        className={`${montserrat.variable} ${inter.variable} font-sans antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
