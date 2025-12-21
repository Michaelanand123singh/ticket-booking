import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import ContactSection from "@/components/shared/ContactSection";
import Toaster from "@/components/ui/Toaster";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <div>
          <ContactSection />
        </div>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
