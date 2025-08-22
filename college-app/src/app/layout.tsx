import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/header";
import Footer from "./components/footer";
import { AuthProvider } from "./context/authContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "College Road Trip App",
  description: "College Road Trip App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/assets/image/favicon.jpg" sizes="16x16" />
      </head>
      <body className={inter.className}>
        <div className="min-h-screen">
          <Header />
          <AuthProvider>
            <main className="min-h-screen w-full">{children}</main>
          </AuthProvider>
          <Footer />
        </div>
      </body>
    </html>
  );
}
