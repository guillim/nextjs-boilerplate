import { auth } from '@/auth';
import SubscribeComponent from '../ui/stripe';

export default async function Page({ searchParams }: { searchParams: { [key: string]: string } }) {
  const user = await auth();
  const success = searchParams['success']
  const canceled = searchParams['canceled']


  return (
    <main>
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
        
        <div>Here, you can define your subscription plans. This button shows how a user can pay for your service.</div>
        <div></div>
        <div>This is also the redirect page after a purchase is made (you can change it).      </div>
        
      </div>

      <h2 className={`mb-4 text-xl md:text-2xl mt-4`}>Your Plan</h2>
      <div>  
        <div>You are using the Basic version. A Pro version adds many additional features and capabilities. Please subscribe or contact us to learn more</div>
        <p>Change the priceId from your stripe account to make this button work </p>
        <SubscribeComponent
          priceId="price_1Q6U4ZP9VWutz4pQA1UC2ilX" 
          price="10" 
          description="Basic Plan" />        
      </div>
      
      
    </main>
  );
}