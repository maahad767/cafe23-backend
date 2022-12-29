import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { GetUser } from './decorators';
import { LoginDto, RegisterDto, UpdateLocationDto } from './dto';
import { JwtAuthGuard } from './guards';
import { UserDocument } from './schemas';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@GetUser() user: UserDocument) {
    return this.authService.getProfile(user);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @Post('update-location')
  async updateLocation(
    @Body() dto: UpdateLocationDto,
    @GetUser() user: UserDocument,
  ) {
    return this.authService.updateLocation(user, dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('logout')
  async logout(@Body() dto: any) {
    // return this.authService.logout(dto);
    // TODO: implement logout
    throw new Error('Not implemented');
  }
}
