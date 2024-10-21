import { lusitana } from '@/app/ui/fonts';
import { GetUserByEmail } from '../../../domain/user/use-case';
 
export default async function Page() {
  // const user = await new GetUser().getUserById('410544b2-4001-4271-9855-fec4b6a6442a');
  const user = await new GetUserByEmail().getUserByEmail('test@test.test');
  await new Promise((resolve) => setTimeout( x => resolve(x), 2000));

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard {user?.props.email}
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        Here comes the dashboard of your next app
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        
      </div>
    </main>
  );
}