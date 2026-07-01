import { Playfair_Display, Inter } from "next/font/google";
import WhatsAppButton from "./components/WhatsAppButton";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Shri Shyam Bhog — Premium Rice",
  description:
    "India's trusted source for premium rice — basmati to export-grade varieties.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col overflow-x-hidden">
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
