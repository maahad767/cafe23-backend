import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as argon from 'argon2';
import { CreateUserDto, LoginDto, RegisterDto, UpdateLocationDto } from './dto';
import { Office, OfficeDocument, User, UserDocument } from './schemas';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Office.name) private officeModel: Model<OfficeDocument>,
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
      .findOne({ bsid: dto.bsid.toLowerCase() })
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

  async getMe(user: UserDocument) {
    const userData = {
      id: user._id,
      bsid: user.bsid,
      name: user.name,
      email: user.email,
      office: await this.officeModel.findById(user.office),
    };
    return userData;
  }

  async updateLocation(user: UserDocument, dto: UpdateLocationDto) {
    console.log(dto);

    let office = await this.officeModel.findOne({
      ...dto,
    });
    if (!office) {
      office = new this.officeModel(dto);
      await office.save();
    }
    user.office = office;
    await this.userModel.updateOne({ _id: user._id }, user);
    return {
      office: user.office,
      bsid: user.bsid,
      name: user.name,
      email: user.email,
    };
  }

  async createUser(dto: CreateUserDto) {
    dto.bsid = dto.bsid.toLowerCase();
    const is_already_exists = await this.userModel.exists({
      bsid: dto.bsid,
    });

    if (is_already_exists) {
      throw new BadRequestException('User already exists');
    }

    const user = new this.userModel(dto);
    return await user.save();
  }

  async createToken(user: UserDocument): Promise<{ access_token: string }> {
    const payload = { email: user.email, bsid: user.bsid, sub: user.id };
    const secret = this.config.get('JWT_SECRET');
    return {
      access_token: await this.jwt.signAsync(payload, {
        expiresIn: '1d',
        secret,
      }),
    };
  }
}
