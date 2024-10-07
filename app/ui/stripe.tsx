'use client';
import axios from 'axios';
import { Button } from './button';
import { stripeInstance } from '@/infra/stripe';

type props = {
  priceId: string;
  price: string;
  description:string;
};

const SubscribeComponent= ({ priceId, price, description }: props) => {
  const handleSubmit = async () => {
    const stripe = stripeInstance.getStripe();
    if (!stripe) {
      return;
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