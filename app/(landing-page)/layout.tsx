import './style.css';
import { Inter, Architects_Daughter } from 'next/font/google';
import Header from './components/header';
import Footer from './components/footer';


const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
});

const architects_daughter = Architects_Daughter({
  subsets: ['latin'],
  variable: '--font-architects-daughter',
  weight: '400',
  display: 'swap'
});

export const metadata = {
  title: 'Landing Page',
  description: 'Landing page for your project',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className={`${inter.variable} ${architects_daughter.variable} flex flex-col min-h-screen overflow-hidden font-inter antialiased bg-gray-950 text-gray-200 tracking-tight`}>
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
 