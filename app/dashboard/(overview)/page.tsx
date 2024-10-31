import { lusitana } from '@/app/ui/fonts';
import { auth } from '@/auth';
import { BanknotesIcon, HomeIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
 
export default async function Page() {
  const user = await auth();
  const name = user?.user?.name || user?.user?.email;
  // await new Promise((resolve) => setTimeout( x => resolve(x), 2000));

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl font-semibold`}>
      Welcome {name} 🌟
      </h1>
      <div className="max-w-2xl margin-auto text-gray-500 text-sm">
        <p>
        You are now ready to rock. Enjoy !
        </p>
      </div>
      <div className="mt-10 flex flex-row space-x-6">
        <Link href={"/billing"}>
          <div className='w-32 h-32 bg-gray-50 flex justify-center items-center flex-col hover:bg-slate-100 cursor-pointer rounded-md'>
            <BanknotesIcon className='h-10 w-10 text-black' />
            <p className='text-black'>Billing</p>
          </div>
        </Link>

        <Link href={"/account"}>
          <div className='w-32 h-32 bg-gray-50 flex justify-center items-center flex-col hover:bg-slate-100 cursor-pointer rounded-md'>
            <HomeIcon className='h-10 w-10 text-black' />
            <p className='text-black'>Account</p>
          </div>
        </Link>

        
      </div>
    </main>
  );
}