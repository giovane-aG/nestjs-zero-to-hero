import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDTO } from './dtos/auth-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() authCredentialsDTO: AuthCredentialsDTO): Promise<void> {
    await this.authService.signUp(authCredentialsDTO);
  }
}
