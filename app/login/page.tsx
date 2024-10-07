import AcmeLogo from '@/app/ui/acme-logo';
import LoginForm from '@/app/ui/login-form';
import { auth } from '@/auth';
import { HomeIcon, PowerIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default async function LoginPage() {
  const user = await auth();
  const name = user?.user?.name || user?.user?.email;
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-20 w-full items-end rounded-lg bg-blue-500 p-3 md:h-36">
          <div className="w-32 text-white md:w-36">
            <AcmeLogo />
          </div>
        </div>
        {!!user ? (
          <div>
            <button
              className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
              title={name ?? undefined}
            >
              <PowerIcon className="w-6" />
              <div className="hidden md:block">Sign Out {name}</div>
            </button>
            <Link 
              href="/"
              className="mt-3 flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
            >            
              <HomeIcon className="w-6" />
              <div className="hidden md:block">Home</div>

            </Link>
          </div>
        ) : (
          <LoginForm />
        )}
      </div>
    </main>
  );
}

 
