import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "RAKAYA | Premium Kayaking Adventure in Kannur, Kerala",
  description:
    "Embark on a cinematic, luxurious kayaking adventure through the hidden backwaters, mangrove trails, and dramatic coastal islands of Kannur, Kerala. Paddle into the wild with Rakaya.",
  keywords: [
    "Kayaking Kerala",
    "Kannur Kayaking",
    "Rakaya Kayak",
    "Kerala Adventure Travel",
    "Backwater Kayaking India",
    "Sunrise Kayaking Kannur",
    "Sunset Kayaking Kerala",
    "Luxury Travel Kerala",
  ],
  authors: [{ name: "Rakaya Adventure" }],
  openGraph: {
    title: "RAKAYA | Premium Kayaking Adventure in Kannur, Kerala",
    description:
      "Embark on a cinematic, luxurious kayaking adventure through the hidden backwaters, mangrove trails, and dramatic coastal islands of Kannur, Kerala.",
    url: "https://rakaya-kayaking.com",
    siteName: "RAKAYA Kayaking",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RAKAYA | Premium Kayaking Adventure in Kannur, Kerala",
    description:
      "Paddle into the wild. Experience premium and immersive kayaking adventures through the serene backwaters of Kannur.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${plusJakartaSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-deep-sea text-white">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
