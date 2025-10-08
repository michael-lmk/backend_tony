import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class DonationService {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-08-27.basil',
    });
  }

  async createPaymentIntent(amount: number) {
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: amount * 100, // Amount in cents
      currency: 'eur',
    });
    return {
      clientSecret: paymentIntent.client_secret,
    };
  }
}
