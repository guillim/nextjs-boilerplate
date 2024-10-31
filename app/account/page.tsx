import { auth } from '@/auth';
import { lusitana } from '../ui/fonts';

export default async function Page() {
  const user = await auth();

  return (
    <main>
      
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl font-semibold`}>Account</h1>
      <div>  
        <div className='flex justify-start'>You are logged in as <span className={`text-blue-800 ml-1`}> {user?.user?.email}</span></div>
      </div>
      
      
    </main>
  );
}