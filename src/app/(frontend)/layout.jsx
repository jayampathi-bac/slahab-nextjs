import Header from "@/app/ui/Header";
import CustomCursor from "@/app/ui/CustomCursor";
import Footer from "@/app/ui/Footer";
import OrganizationSchema from "@/app/(frontend)/components/OrganizationSchema";
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
  metadataBase: new URL("https://slahab.lk"),
  title: {
    default: "SLAHAB - Sri Lanka Association of Hairdressers & Beauticians",
    template: "%s | SLAHAB",
  },
  description:
    "Established in 1996, SLAHAB is the premier national body representing hairdressers, beauticians, and stylists in Sri Lanka, fostering education, global standards, and international competition.",
  keywords: [
    "SLAHAB",
    "Sri Lanka hairdressers",
    "Sri Lanka beauticians",
    "hairdressing association Sri Lanka",
    "OMC Sri Lanka",
    "ICD Sri Lanka",
    "hair beauty Sri Lanka",
  ],
  authors: [{ name: "SLAHAB" }],
  icons: {
    icon: [{ url: "/images/slahab/slahab_crest.png", type: "image/png" }],
    shortcut: "/images/slahab/slahab_crest.png",
    apple: "/images/slahab/slahab_crest.png",
  },
  openGraph: {
    type: "website",
    url: "https://slahab.lk",
    siteName: "SLAHAB",
    title: "SLAHAB - Sri Lanka Association of Hairdressers & Beauticians",
    description:
      "Established in 1996, SLAHAB is the premier national body representing hairdressers, beauticians, and stylists in Sri Lanka, fostering education, global standards, and international competition.",
    images: [
      {
        url: "/images/slahab/slahab_share_logo.jpg",
        width: 500,
        height: 500,
        alt: "SLAHAB Logo",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "SLAHAB - Sri Lanka Association of Hairdressers & Beauticians",
    description:
      "Established in 1996, SLAHAB is the premier national body representing hairdressers, beauticians, and stylists in Sri Lanka, fostering education, global standards, and international competition.",
    images: ["/images/slahab/slahab_share_logo.jpg"],
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
        <Header />
        <CustomCursor />
        {children}
        <Footer />
      </body>
    </html>
  );
}
