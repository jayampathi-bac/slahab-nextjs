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

export const metadata = {
  title: "SLAHAB - Sri Lanka Association of Hairdressers & Beauticians",
  description: "Established in 1996, SLAHAB is the premier national body representing hairdressers, beauticians, and stylists in Sri Lanka, fostering education, global standards, and international competition.",
  authors: [{ name: "Laralink" }],
  icons: {
    icon: "/images/favicon.ico",
  },
  openGraph: {
    type: "website",
    url: "https://slahab.vercel.app/",
    title: "SLAHAB - Sri Lanka Association of Hairdressers & Beauticians",
    description: "Established in 1996, SLAHAB is the premier national body representing hairdressers, beauticians, and stylists in Sri Lanka, fostering education, global standards, and international competition.",
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
    description: "Established in 1996, SLAHAB is the premier national body representing hairdressers, beauticians, and stylists in Sri Lanka, fostering education, global standards, and international competition.",
    images: ["https://slahab.vercel.app/images/slahab/slahab_share_logo.jpg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${openSans.variable} ${poppins.variable}`}>
        <Header />
        <CustomCursor />
        {children}
        <Footer />
      </body>
    </html>
  );
}
