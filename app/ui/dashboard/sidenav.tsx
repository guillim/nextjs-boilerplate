import NavLinks from '@/app/ui/dashboard/nav-links';
import AcmeLogo from '@/app/ui/acme-logo';
import { PowerIcon } from '@heroicons/react/24/outline';
import { signOut, auth } from '@/auth';

export default async function SideNav() {
  const user = await auth();
  const name = user?.user?.name || user?.user?.email;
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <span
        className="mb-2 flex h-10 items-end justify-start rounded-md p-2"
      >
        <div className="w-32 text-black md:w-40">
          <AcmeLogo />
        </div>
      </span>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        <form action={async () => {
          'use server';
          await signOut();
        }}>
          { !!user && 
          <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3" title={name ?? undefined}>
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Sign Out</div>
          </button>                
          }
          
        </form>
      </div>
    </div>
  );
}
