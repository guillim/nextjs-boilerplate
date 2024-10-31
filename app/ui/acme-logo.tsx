import Image from 'next/image';
import Logo from '../(landing-page)/public/images/logo.svg';
import Link from 'next/link';

export default function AcmeLogo() {
  return (
    <Link href="/">
      <div
        className={'flex flex-row items-center leading-none text-white'}
      >
        <Image
          src={Logo}
          alt="Logo"
          width={30}
          height={30}
          className="h-8 bg-white rounded-full max-w-fit"
        />
        <p className="text-[20px] text-black font-bold tracking-tight	pl-2">Acme</p>
      </div>
    </Link>
  );
}
