import { Module } from '@nestjs/common';
import { RequestService } from './request.service';
import { RequestController } from './request.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Request, RequestSchema } from './schemas';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Request.name, schema: RequestSchema }]),
    PassportModule,
    JwtModule.register({}),
  ],
  controllers: [RequestController],
  providers: [RequestService],
})
export class RequestModule {}
