import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('device-login')
  async loginWithDevice(@Body() body: { deviceId: string }) {
    return this.authService.validateDevice(body.deviceId);
  }
}
