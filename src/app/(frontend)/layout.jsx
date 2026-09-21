import Header from "@/app/ui/Header";
import CustomCursor from "@/app/ui/CustomCursor";
import Footer from "@/app/ui/Footer";
import OrganizationSchema from "@/app/(frontend)/components/OrganizationSchema";
import { siteConfig } from "@/lib/siteConfig";
import Script from "next/script";
import "@/app/scss/index.scss";
import "swiper/css";
import "swiper/css/pagination";
import { Poppins, Open_Sans } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--primary-font",
});
const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--secondary-font",
});

export const viewport = {
  themeColor: "#c29b57",
}

export const metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} - ${siteConfig.legalName}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "SLAHAB",
    "Sri Lanka hairdressers",
    "Sri Lanka beauticians",
    "hairdressing association Sri Lanka",
    "OMC Sri Lanka",
    "ICD Sri Lanka",
    "hair beauty Sri Lanka",
  ],
  authors: [{ name: siteConfig.name }],
  icons: {
    icon: [{ url: siteConfig.logo, type: "image/png" }],
    shortcut: siteConfig.logo,
    apple: siteConfig.logo,
  },
  openGraph: {
    type: "website",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} - ${siteConfig.legalName}`,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 500,
        height: 500,
        alt: `${siteConfig.name} Logo`,
      },
    ],
  },
  twitter: {
    card: "summary",
    title: `${siteConfig.name} - ${siteConfig.legalName}`,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
};

export default function FrontendLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${openSans.variable} ${poppins.variable}`}
        suppressHydrationWarning
      >
        <OrganizationSchema />
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">{`
              window.dataLayer=window.dataLayer||[];
              function gtag(){dataLayer.push(arguments);}
              gtag('js',new Date());
              gtag('config','${process.env.NEXT_PUBLIC_GA_ID}');
            `}</Script>
          </>
        )}
        <Header />
        <CustomCursor />
        {children}
        <Footer />
      </body>
    </html>
  );
}
