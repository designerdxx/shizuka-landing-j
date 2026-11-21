import type { Metadata, Viewport } from "next";
import { Castoro, Hanken_Grotesk } from "next/font/google";
import { asset } from "./asset";
import "./globals.css";

const f_cas = Castoro({ variable: "--f-cas", subsets: ["latin"], weight: "400", style: ["normal", "italic"], display: "swap" });
const f_han = Hanken_Grotesk({ variable: "--f-han", subsets: ["latin"], weight: ["400", "500"], display: "swap" });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Shizuka Luxury | Sell your luxury pieces privately in Dubai",
  description:
    "Get cash for your handbags, watches and jewellery within 72 hours. Shizuka collects, authenticates and gathers private offers on your behalf.",
  openGraph: {
    title: "Shizuka Luxury",
    description: "A private way to sell your handbags, watches and jewellery in Dubai. Cash within 72 hours.",
    images: [{ url: asset("/images/lounge-handbag.jpg"), width: 2000, height: 1333, alt: "Seen from above: a woman in an olive suit on a cream boucl\u00e9 sofa, a black quilted handbag at her side" }],
    locale: "en_GB",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#24221E",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-GB" className={`${f_cas.variable} ${f_han.variable}`}>
      <body>{children}</body>
    </html>
  );
}
