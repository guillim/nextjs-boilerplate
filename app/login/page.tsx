import AcmeLogo from '@/app/ui/acme-logo';
import LoginForm from '@/app/ui/login-form';
import { auth } from '@/auth';
import { HomeIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import LogoutButton from '../ui/logout-button';
import { providersList } from '@/infra/providerDetector';
import Image from 'next/image';
import VideoThumb from '../(landing-page)/public/images/hero-image-01.jpg';

export default async function LoginPage() {
  const user = await auth();
  const name = user?.user?.name || user?.user?.email;
  return (
    <main className="">
      <div className="flex flex-col md:flex-row items-center justify-center md:h-screen">
        <div className="hidden md:flex md:w-1/2 h-full">
          <Image 
            src={VideoThumb}
            alt="screenshot Image" 
            className="object-cover w-full h-full"
          />
        </div>
        <div className="relative mx-auto flex w-full md:w-1/2 max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
          <div className="flex h-20 w-full items-end rounded-lg p-3 md:h-36">
            <div className="w-32 text-white md:w-36">
              <AcmeLogo />
            </div>
          </div>
          {!!user ? (
            <div>
            
              <Link 
                href="/dashboard"
                className="my-3 flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
              >            
                <HomeIcon className="w-6" />
                <div className="hidden md:block" title={name || ''}>Home</div>

              </Link>
              <LogoutButton />
            </div>
          ) : (
            (providersList.googleAuth.isAvailable) ?
              <LoginForm /> :
              <p>Google Auth not configured. Have a look at <a href="/env.example">/env.example</a> to understand how to configure required services. More info on the setup <a href="/README.md">here</a> </p>

          )}
        </div>
      </div>
    </main>
  );
}

 
