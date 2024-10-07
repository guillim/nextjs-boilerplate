import { lusitana } from '@/app/ui/fonts';
import { auth } from '@/auth';
 
export default async function Page() {
  const user = await auth();

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Billing of {user?.user?.email}
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        Here is a page you, as a user, lands on after payment
      </div>
    </main>
  );
}