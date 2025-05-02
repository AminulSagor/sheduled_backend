import { Controller, Post, Body } from '@nestjs/common';

@Controller('twiml')
export class TwimlController {

  @Post('call')
  handlePostRequest(@Body() body: any) {
    // Here you can process the incoming POST request body if needed
    // You can also fetch a file URL dynamically based on input

    const twimlResponse = `<?xml version="1.0" encoding="UTF-8"?>
    <Response>
      <Say voice="woman">ebar cholbe insallah</Say>
      <Play>https://utomiwubfeyxyfkkmril.supabase.co/storage/v1/object/public/library//dont-talk-315229.mp3</Play>
    </Response>`;

    return twimlResponse;
  }
}
