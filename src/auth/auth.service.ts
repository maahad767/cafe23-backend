import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as argon from 'argon2';
import { CreateUserDto, LoginDto, RegisterDto } from './dto';
import { User, UserDocument } from './schemas';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async register(dto: RegisterDto) {
    const hash = await argon.hash(dto.password);

    try {
      const user = await this.createUser({ ...dto, hash } as CreateUserDto);
      return this.createToken(user);
    } catch (error) {
      throw error;
    }
  }

  async login(dto: LoginDto) {
    const user = await this.userModel
      .findOne({ bsId: dto.bsId.toLowerCase() })
      .exec();

    // if user not found
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // verify password
    const valid = await argon.verify(user.hash, dto.password);

    // if password is invalid
    if (!valid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.createToken(user);
  }

  async createUser(dto: CreateUserDto) {
    const is_already_exists = await this.userModel.exists({
      bsId: dto.bsId.toLowerCase(),
    });

    if (is_already_exists) {
      throw new BadRequestException('User already exists');
    }

    const user = new this.userModel(dto);
    return user.save();
  }

  async createToken(user: any): Promise<{ access_token: string }> {
    const payload = { email: user.email, bsId: user.bsId, sub: user.id };
    const secret = this.config.get('JWT_SECRET');
    return {
      access_token: await this.jwt.signAsync(payload, {
        expiresIn: '15m',
        secret,
      }),
    };
  }
}
