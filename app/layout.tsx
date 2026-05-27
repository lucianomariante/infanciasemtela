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
    default: "Infancia Sem Tela",
    template: "%s | Infancia Sem Tela",
  },
  description:
    "Guias praticos para escolher brinquedos, presentes e ideias sem tela para criancas.",
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
      <body className="min-h-full flex flex-col">
        {children}
        <footer className="shrink-0 border-t border-slate-200 bg-slate-50 px-5 py-4 text-center text-xs leading-5 text-slate-500 sm:px-8">
          Como Associado da Amazon, podemos receber comiss&atilde;o por compras
          qualificadas.
        </footer>
      </body>
    </html>
  );
}
