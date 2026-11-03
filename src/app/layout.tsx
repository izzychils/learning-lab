import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-plus",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Learning Lab | Make the invisible visible",
    template: "%s | Learning Lab",
  },
  description:
    "Learning Lab turns chemistry, biology, physics and anatomy into interactive 2D simulations, with an AI tutor that explains the science behind what you see.",
  keywords: [
    "virtual laboratory",
    "science simulations",
    "AI tutor",
    "molecular explorer",
    "anatomy learning",
    "STEM education",
  ],
  openGraph: {
    title: "Learning Lab | Make the invisible visible",
    description:
      "Interactive science simulations and an AI tutor for curious minds. Explore molecules, cells, forces and the human body in your browser.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0a08",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
