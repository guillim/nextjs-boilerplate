import { auth } from '@/auth';
import SubscribeComponent from '../ui/stripe';
import Popup from '../ui/popup';
import Link from 'next/link';
// import { Button } from '../ui/button';
import axios from 'axios';
import { GetUserCompany } from '@/domain/user/use-case';
// import { showToast } from '../lib/utils';
import { ValidateCreditsResponse } from '../api/payment/validate_credits/route';
import Toast from '../ui/toast';

export default async function Page({ searchParams }: { searchParams: { [key: string]: string } }) {
  const user = await auth();
  const status = searchParams['payment_status']
  const payment_id = searchParams['payment_id']

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';

  let creditAdded = false;
  let creditAddedMessage = "";

  const company = await new GetUserCompany().getUserCompany(user?.user?.id || '');
  // console.log(baseUrl + "/api/payment/validate_credits")

  //when accessing billing, check if a payment was made
  //if so, validate the credits for the user, add them to the user account
  if (payment_id) {
    try {
      // Fetch companyId from user object, assuming it's stored in user.user.companyId


      console.log('addCredits', {
        paymentId: payment_id,
        companyId: company?.id
      });
      const addCredits = await axios.post(`${baseUrl}/api/payment/validate_credits`, {
        paymentId: payment_id,
        companyId: company?.id
      });

      console.log('Credits added:', addCredits.data);

      const addCreditsResponse = addCredits.data as ValidateCreditsResponse;

      if (addCreditsResponse.alreadyProcessed === true) {
        // showToast('Those credits have already been added!', 'error', 5000);
        creditAdded = false;
        creditAddedMessage = 'Those credits have already been added!';
      } else {
        // showToast(`${addCreditsResponse.creditsAdded} credits added successfully!`, 'success');
        creditAdded = true;
        creditAddedMessage = `${addCreditsResponse.creditsAdded} credits added successfully!`;
      }
    } catch (error) {
      console.error('Error validating credits:', error);

      // showToast('Those credits have already been added!', 'error', 5000);
      // }
    }
  }
  else {
    console.log('No payment status or payment ID found in search parameters');
  }

  const redCross = <svg className="w-3 h-3 fill-current text-red-500 mr-2 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.414 1.414a1 1 0 00-1.414 0L6 5.414 2.414 1.828a1 1 0 00-1.414 1.414L4.586 6.828 1 10.414a1 1 0 001.414 1.414L6 8.242l3.586 3.586a1 1 0 001.414-1.414L7.414 6.828l3.586-3.586a1 1 0 000-1.414z" />
  </svg>
  const greenCheck = <svg className="w-3 h-3 fill-current text-green-500 mr-2 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
    <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
  </svg>

  return (
    <main>
      <Toast message={creditAddedMessage} type={creditAdded ? "success" : "error"} showToast={creditAdded} />
      <h3 className='mt-10 text-lg font-semibold'>Billing</h3>
      <Popup
        btnCloseText="Close"
        btnText="A question ?"
        // hideIcon={true}
        title="Billing Support"
        msg="If you have any question about your billing, please contact us at contact@example.com"
        className=""
      />
      {status === 'succeeded' &&
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          Thank you {user?.user?.name} for your payment
        </div>
      }

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        You have {company?.creditBalance} credits available
      </div>
      {/* {canceled === 'true' &&
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          Sorry {user?.user?.name}, your payment was refused
        </div>
      } */}
      <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

        <div>Here, you can define your subscription plans, show your user subscirptions... And point to upgrades :)</div>
        <div></div>
        <div>This is also the redirect page after a purchase is made (you can change it).      </div>

      </div>

      <div className='border-t-2 border-gray-100 m-10'></div>
      Example
      <div className="mt-4">
        <div className="flex justify-start items-center">{greenCheck}  You are using the Basic version</div>
        <div className="flex justify-start items-center">{redCross} A Pro version adds many additional features and capabilities</div>
      </div>
      <div className='mt-6 grid gap-6 sm:grid-cols-2'>

        <div>Please subscribe or contact us to learn more
          <p>(You will need to change the priceId from your stripe account to make this button work)</p>
        </div>

        <SubscribeComponent
          productId="pdt_t6s8B49ZfoYMq5ZSpuX6j"
        />
      </div>

      <div className='border-t-2 border-gray-100 m-10'></div>

      <div className='mt-6 grid gap-6 sm:grid-cols-2'>
        <p className=''>For users with a subscription</p>
        <Link
          className="p-2 w-fit justify-center h-[44px] self-center content-center flex items-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
          href={process.env.NEXT_PUBLIC_STRIPE_PORTAL_URL! || 'https://docs.stripe.com/no-code/customer-portal'}
          target="_blank">
          Manage monthly Plan
        </Link>
      </div>

    </main>
  );
}