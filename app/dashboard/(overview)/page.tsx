import { lusitana } from '@/app/ui/fonts';
import { auth } from '@/auth';
 
export default async function Page() {
  const user = await auth();
  const name = user?.user?.name || user?.user?.email;
  await new Promise((resolve) => setTimeout( x => resolve(x), 2000));

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl font-semibold`}>
      🤙🏻 Hi {name},
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        Here comes the dashboard of your next app
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        
      </div>
    </main>
  );
}