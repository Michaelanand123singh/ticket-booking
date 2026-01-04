import type { Metadata } from "next";
import { Poppins, Libre_Baskerville } from "next/font/google";
import "../globals.css";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import Toaster from "@/components/ui/Toaster";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

const libreBaskerville = Libre_Baskerville({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-libre-baskerville",
});

export const metadata: Metadata = {
  title: "Viagosport - Premium Sports Experiences & Athlete Management",
  description: "Book exclusive sports experiences, manage athlete profiles, and find events. Fast, secure, and reliable platform.",
  keywords: "sports, experiences, athletes, events, booking, viagosport",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} font-sans ${libreBaskerville.variable} flex flex-col min-h-screen`}>
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
