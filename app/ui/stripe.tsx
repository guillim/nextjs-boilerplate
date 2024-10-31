'use client';
import axios from 'axios';
import { Button } from './button';
import { stripeInstance } from '@/infra/stripe';

type props = {
  priceId: string;
  price: string;
  description:string;
};

const SubscribeComponent= ({ priceId }: props) => {
  const handleSubmit = async () => {
    const stripe = stripeInstance.getStripe();
    if (!stripe) {
      return;
    }
    if (priceId === 'price_1Q6U4ZP9VWutz4pQA1UC2ilX') {
      console.log('You need to change the priceId to make this button work, you are currently using the default priceId');
      return
    }
    try {
      const response = await axios.post('/api/payment/checkout_sessions', {
        priceId: priceId
      });
      const data = response.data;
      if (!data.ok) throw new Error('Something went wrong');
      await stripe.redirectToCheckout({
        sessionId: data.result.id
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      {/* Click Below button to get {description} */}
      <Button   
        onClick={handleSubmit}
      >
        Upgrade
      </Button>
    </div>
  );
};
export default SubscribeComponent;