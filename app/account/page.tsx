import { auth } from '@/auth';
import { lusitana } from '../ui/fonts';
import LogoutButton from '../ui/logout-button';

export default async function Page() {
  const user = await auth();

  return (
    <main>
      
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl font-semibold`}>Account</h1>
      <div>  
        <div>You are logged in as {user?.user?.email}</div>
        <div>If you want to sign out, click here</div>
        <div className={`max-w-60`}><LogoutButton /></div>
        
      </div>
      
      
    </main>
  );
}