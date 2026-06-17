"use client";
import Header from "@/app/ui/Header";
import CustomCursor from "@/app/ui/CustomCursor";
import Footer from "@/app/ui/Footer";
import "swiper/css";
import "swiper/css/pagination";
import "./scss/index.scss";
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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="author" content="Laralink" />
        <link rel="icon" href="/images/favicon.ico" sizes="any" />
        <title>SLAHAB - Sri Lanka Association of Hairdressers & Beauticians</title>
        
        {/* Open Graph / Facebook / WhatsApp Link Preview */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://slahab.vercel.app/" />
        <meta property="og:title" content="SLAHAB - Sri Lanka Association of Hairdressers & Beauticians" />
        <meta property="og:description" content="Established in 1996, SLAHAB is the premier national body representing hairdressers, beauticians, and stylists in Sri Lanka, fostering education, global standards, and international competition." />
        <meta property="og:image" content="https://slahab.vercel.app/images/slahab/slahab_share_logo.jpg" />
        <meta property="og:image:width" content="500" />
        <meta property="og:image:height" content="500" />
        <meta property="og:image:type" content="image/jpeg" />

        {/* Twitter Card Link Preview */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:url" content="https://slahab.vercel.app/" />
        <meta name="twitter:title" content="SLAHAB - Sri Lanka Association of Hairdressers & Beauticians" />
        <meta name="twitter:description" content="Established in 1996, SLAHAB is the premier national body representing hairdressers, beauticians, and stylists in Sri Lanka, fostering education, global standards, and international competition." />
        <meta name="twitter:image" content="https://slahab.vercel.app/images/slahab/slahab_share_logo.jpg" />
      </head>
      <body className={`${openSans.variable} ${poppins.variable}`}>
        <Header />
        <CustomCursor />
        {children}
        <Footer />
      </body>
    </html>
  );
}
