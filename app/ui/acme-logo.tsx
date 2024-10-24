import Image from 'next/image';
import Logo from '../(landing-page)/public/images/logo.svg';

export default function AcmeLogo() {
  return (
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
      <p className="text-[20px]">Acme</p>
    </div>
  );
}
