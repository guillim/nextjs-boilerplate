import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import { Metadata } from 'next';
import GoogleAnalyticsWrapper from '@/infra/googleAnalytics';
import GoogleTagManagerWrapper from '@/infra/googleTagManager';

export const metadata: Metadata = {
  title: {
    template: '%s | Dashboard',
    default: 'default Dashboard',
  },
  description: 'The official Next.js Course Dashboard, built with App Router.',
  // metadataBase: new URL('https://mywebsite.com'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <GoogleAnalyticsWrapper />
        <GoogleTagManagerWrapper />
        {children}
      </body>
    </html>
  );
}
