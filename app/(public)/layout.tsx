import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";
import Toaster from "@/components/Toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TicketHub - Sports & Concert Ticket Booking",
  description: "Book sports and concert tickets online. Fast, secure, and reliable ticket booking platform.",
  keywords: "tickets, sports tickets, concert tickets, event tickets, booking",
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
