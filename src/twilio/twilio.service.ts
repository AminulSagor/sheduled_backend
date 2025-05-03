import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as twilio from 'twilio';

@Injectable()
export class TwilioService {
  private client: twilio.Twilio;

  constructor(private readonly config: ConfigService) {
    this.client = twilio(
      this.config.get<string>('TWILIO_ACCOUNT_SID'),
      this.config.get<string>('TWILIO_AUTH_TOKEN'),
    );
  }

  async makeCall(to: string, audioUrl: string): Promise<any> {
    const from = this.config.get<string>('TWILIO_PHONE_NUMBER');
  

    if (!from) {
      throw new Error('Twilio FROM number is not defined in env');
    }

  

    const response = await this.client.calls.create({
      to,
      from,
      url: audioUrl,
    });

    return response;
  }
}
