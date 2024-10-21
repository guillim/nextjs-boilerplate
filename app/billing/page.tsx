import { lusitana } from '@/app/ui/fonts';
import { auth } from '@/auth';

export default async function Page({ searchParams }: { searchParams: { [key: string]: string } }) {
  const user = await auth();
  const success = searchParams['success']
  const canceled = searchParams['canceled']


  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Billing
      </h1>
      {success === 'true' &&
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        Thank you {user?.user?.name} for your payment
      </div>
      }
      {canceled === 'true' &&
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        Sorry {user?.user?.name}, your payment was refused
      </div>
      }
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        Here, you can define your subscription plans. This button shows how a user can pay for your service.
      
        
      </div>
    </main>
  );
}