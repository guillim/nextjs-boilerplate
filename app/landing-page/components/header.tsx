import Link from 'next/link';
import MobileMenu from './mobile-menu';
import Image from 'next/image';
import Logo from '../public/images/logo.svg';

export default function Header() {
  const showLogo = true;
  return (
    <header className="absolute w-full z-30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Site branding */}
          <div className="shrink-0 mr-4">
            {/* Logo */}
            {showLogo && (  
              <Link href="/" className="block" aria-label="Cruip">
                <Image 
                  src={Logo} 
                  alt="Cruip" 
                  width={120} 
                  height={40} 
                  className="h-8 bg-white rounded-full max-w-fit"
                ></Image>
              </Link>
            )}
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex md:grow">
            {/* Desktop sign in links */}
            <ul className="flex grow justify-end flex-wrap items-center">
              <li>
                <Link
                  href="/signin"
                  className="font-medium text-purple-600 hover:text-gray-200 px-4 py-3 flex items-center transition duration-150 ease-in-out"
                >
                  Sign in
                </Link>
              </li>
              <li>
                <Link href="/signup" className="btn-sm text-white bg-purple-600 hover:bg-purple-700 ml-3">
                  Sign up
                </Link>
              </li>
            </ul>
          </nav>

          <MobileMenu />

        </div>
      </div>
    </header>
  );
}
