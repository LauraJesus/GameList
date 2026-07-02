import type { Metadata } from "next";
import "./globals.css";
import Header from "@/componentes/Header/Header";
import Footer from "@/componentes/Footer/Footer";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "GameList",
  description: "Explore jogos por gênero e gerencie sua lista de desejos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <Header />
        {children}
        <Footer />
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
