import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import Header from '@/components/header';
import Footer from '@/components/footer';
import { version } from '../../package.json';

export const metadata: Metadata = {
  title: 'Spin The Wheel',
  description: 'A spinning wheel app to make decisions fun.',
  keywords: ['Spin the Wheel', 'Wheel of name', 'Random name picker', 'spinning wheel', 'random picker', 'decision wheel', 'prize wheel', 'raffle wheel', 'giveaway tool', 'online spinner'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3309538140632443" crossOrigin="anonymous"></script>
      </head>
      <body className="font-body antialiased flex flex-col min-h-svh">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer version={version} />
        <Toaster />

        {/* Google tag (gtag.js) */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-LR95S4Y34E"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-LR95S4Y34E');
          `}
        </Script>
      </body>
    </html>
  );
}
