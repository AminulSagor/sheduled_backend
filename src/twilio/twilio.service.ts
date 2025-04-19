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
    const baseUrl = this.config.get<string>('NGROK_BASE_URL'); // ✅ from .env

    if (!from) {
      throw new Error('Twilio FROM number is not defined in env');
    }

    if (!baseUrl) {
      throw new Error('NGROK_BASE_URL is not defined in env');
    }

    const twimlUrl = `${baseUrl}/twiml?audio=${encodeURIComponent(audioUrl)}`;

    const response = await this.client.calls.create({
      to,
      from,
      url: twimlUrl,
    });

    return response;
  }
}
