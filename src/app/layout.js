import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/Navbar/Navbar";
import ChatBot from "@/components/ChatBot/ChatBot";

export const metadata = {
  title: "SmartStore AI - Intelligent Product Platform",
  description: "Discover, compare, and get AI-powered product recommendations with SmartStore AI. Your intelligent shopping companion powered by Google Gemini.",
  keywords: "smartstore, ai, products, shopping, gemini, intelligent, ecommerce",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Navbar />
          <main>{children}</main>
          <ChatBot />
        </AuthProvider>
      </body>
    </html>
  );
}
