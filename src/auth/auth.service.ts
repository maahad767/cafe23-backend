import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as argon from 'argon2';
import { CreateUserDto, LoginDto, RegisterDto } from './dto';
import { User, UserDocument } from './schemas';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async register(dto: RegisterDto) {
    const hash = await argon.hash(dto.password);

    try {
      // Save the user to the database
      const user = await this.createUser(dto);
    } catch (error) {
      throw error;
    }
    return { message: 'User created' };
  }

  async login(dto: LoginDto) {
    return { message: 'User logged in' };
  }

  async createUser(dto: CreateUserDto) {
    const user = new this.userModel(dto);
    return user.save();
  }
}
