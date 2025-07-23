'use client';
// import axios from 'axios';
import { Button } from './button';
// import { stripeInstance } from '@/infra/stripe';
import { DodoPayments } from 'dodopayments-checkout';

type props = {
  productId: string;
};

const SubscribeComponent = ({productId}: props) => {

  // Initialize the SDK
  DodoPayments.Initialize({
    mode: "test", // 'test' or 'live'
    onEvent: (event) => {
      console.log("Checkout event:", event);
    },
    theme: "light", // 'light' or 'dark'
    linkType: "static", // 'static' or 'dynamic'
    displayType: "overlay",
    
  });

  const handleSubmit = async () => {

    try {
      // Open checkout
      DodoPayments.Checkout.open({
        products: [
          {
            productId: productId,
            quantity: 1,
          },
        ],
        redirectUrl: "http://localhost:3000/billing/",
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