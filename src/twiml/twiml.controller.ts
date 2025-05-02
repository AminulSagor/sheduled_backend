import { Controller, Post, Body } from '@nestjs/common';

@Controller('twiml')
export class TwimlController {

  @Post('call')
  handlePostRequest(@Body() body: any) {
    // Here you can process the incoming POST request body if needed
    // You can also fetch a file URL dynamically based on input

    const twimlResponse = `<?xml version="1.0" encoding="UTF-8"?>
    <Response>
      <Say voice="woman">Thanks for trying our documentation. Enjoy!</Say>
      <Play>https://firebasestorage.googleapis.com/v0/b/instagram-clone-f45ae.appspot.com/o/twiml.xml?alt=media</Play>
    </Response>`;

    return twimlResponse;
  }
}
