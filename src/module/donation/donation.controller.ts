import { Controller, Post, Body } from '@nestjs/common';
import { DonationService } from './donation.service';

@Controller('donation')
export class DonationController {
  constructor(private readonly donationService: DonationService) {}

  @Post('create-payment-intent')
  createPaymentIntent(@Body() body: { amount: number }) {
    return this.donationService.createPaymentIntent(body.amount);
  }
}
