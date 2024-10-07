import { loadStripe, Stripe } from '@stripe/stripe-js';
import { providersList } from './providerDetector';

class StripeWrapper {
  stripe: Stripe | null;
  constructor() {
    this.stripe = null;
    if (providersList.stripe.isAvailable) {
      this.initialize();
    }
  }
  private async initialize(){
    this.stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);
  }
  public getStripe(){
    return this.stripe;
  }
} 

export const stripeInstance = new StripeWrapper();
