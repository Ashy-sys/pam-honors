import "./globals.css";
import Providers from "./providers/SessionProvider";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import {
  Fraunces,
  Inter,
  JetBrains_Mono,
} from "next/font/google";


const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});


const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600"],
});


const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  weight: ["400", "500"],
});


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <body
        className={`${fraunces.variable} ${inter.variable} ${jetbrains.variable}`}
      >
        <Providers>
          <Navbar />

          <main>
            {children}
          </main>

          <Footer />
        </Providers>
      </body>
    </html>
  );
}