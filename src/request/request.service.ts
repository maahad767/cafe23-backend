import {
  BadRequestException,
  Injectable,
  // UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRequestDto, RequestQueryDto, UserRequestQueryDto } from './dto';
import { Request, RequestDocument } from './schemas';
import { User, UserDocument } from '../auth/schemas/user.schema';
import { Request as expressRequest } from 'express';
import jwt_decode from 'jwt-decode';
import { CreateResponse, Decode } from './types';

@Injectable()
export class RequestService {
  constructor(
    @InjectModel(Request.name) private requestModel: Model<RequestDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async createRequestItem(
    requestDto: CreateRequestDto,
    req: expressRequest,
  ): Promise<CreateResponse> {
    try {
      const decode: Decode = jwt_decode(req?.headers?.authorization);
      let newReq = {
        ...requestDto,
        bsId: decode?.bsId,
        requestedUserId: decode?.sub,
      };
      const newItem = new this.requestModel(newReq);
      const itemInfo = await newItem.save();
      return {
        message: 'Request Created successfully',
        itemInfo,
      };
    } catch (error) {
      throw new BadRequestException('Can not create request');
    }
  }

  async findAllRequests(query: RequestQueryDto, req: expressRequest) {
    try {
      const decode: Decode = jwt_decode(req?.headers?.authorization);
      const address = {
        branch: 'Mohakhali',
        floor: '5th',
        room: '405A',
      };
      const userInfo = await this.userModel.findById(decode?.sub);

      if (userInfo?.role === 'EMPLOYEE') {
        const findQuery =
          query.status === 'All'
            ? { bsId: decode?.bsId }
            : { status: query?.status, bsId: decode?.bsId };
        return await this.requestModel
          .find(findQuery)
          .populate('requestedUserId', '-hash')
          .sort({ createdAt: 'descending' })
          .skip(+query?.skip)
          .limit(+query?.limit);
      } else {
        let addressQuery = {
          'address.branch': address?.branch,
          'address.floor': address?.floor,
          'address.room': address?.room,
        };
        const findQuery =
          query?.status === 'All'
            ? {
                ...addressQuery,
              }
            : query?.status === 'Served'
            ? {
                status: query?.status,
                ...addressQuery,
                servedUserId: userInfo?._id,
              }
            : { status: query?.status, ...addressQuery };
        return await this.requestModel
          .find(findQuery)
          .populate('requestedUserId', '-hash')
          .sort({ createdAt: 'descending' })
          .skip(+query?.skip)
          .limit(+query?.limit);
      }
    } catch (error) {
      throw new BadRequestException('Something Unexpected');
    }
  }

  async findRequestDetails(id: string) {
    try {
      return await this.requestModel
        .findById(id)
        .populate('requestedUserId', '-hash');
    } catch (error) {
      throw new BadRequestException('Something Unexpected');
    }
  }
}
