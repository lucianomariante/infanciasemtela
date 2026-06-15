import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Infância Sem Tela",
    template: "%s | Infância Sem Tela",
  },
  description:
    "Guias práticos para escolher brinquedos, presentes e ideias sem tela para crianças.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-[#faf7f0]">
        {children}
        <footer className="shrink-0 border-t border-[#e7dccb] bg-[#f6eee2] px-5 py-5 text-center text-xs leading-5 text-stone-600 sm:px-8">
          Como Associado da Amazon, podemos receber comiss&atilde;o por compras
          qualificadas.
        </footer>
      </body>
    </html>
  );
}
