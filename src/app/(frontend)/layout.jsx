import Header from "@/app/ui/Header";
import CustomCursor from "@/app/ui/CustomCursor";
import Footer from "@/app/ui/Footer";
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

export const metadata = {
  title: "SLAHAB - Sri Lanka Association of Hairdressers & Beauticians",
  description:
    "Established in 1996, SLAHAB is the premier national body representing hairdressers, beauticians, and stylists in Sri Lanka, fostering education, global standards, and international competition.",
  authors: [{ name: "Laralink" }],
  icons: {
    icon: "/images/favicon.ico",
  },
  openGraph: {
    type: "website",
    url: "https://slahab.vercel.app/",
    title: "SLAHAB - Sri Lanka Association of Hairdressers & Beauticians",
    description:
      "Established in 1996, SLAHAB is the premier national body representing hairdressers, beauticians, and stylists in Sri Lanka, fostering education, global standards, and international competition.",
    images: [
      {
        url: "https://slahab.vercel.app/images/slahab/slahab_share_logo.jpg",
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
    images: ["https://slahab.vercel.app/images/slahab/slahab_share_logo.jpg"],
  },
};

export default function FrontendLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${openSans.variable} ${poppins.variable}`}
        suppressHydrationWarning
      >
        <Header />
        <CustomCursor />
        {children}
        <Footer />
      </body>
    </html>
  );
}
