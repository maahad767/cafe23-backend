import {
  BadRequestException,
  Injectable,
  // UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRequestDto, RequestQueryDto, UserRequestQueryDto } from './dto';
import { Request, RequestDocument } from './schemas';
import { Request as expressRequest } from 'express';
import jwt_decode from 'jwt-decode';
import { CreateResponse, Decode } from './types';

@Injectable()
export class RequestService {
  constructor(
    @InjectModel(Request.name) private requestModel: Model<RequestDocument>,
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
      const findQuery =
        query.status === 'All' ? null : { status: query?.status };
      return await this.requestModel
        .find(findQuery)
        .sort({ createdAt: 'descending' })
        .skip(+query?.skip)
        .limit(+query?.limit);
    } catch (error) {
      throw new BadRequestException('Something Unexpected');
    }
  }

  async findAllUserRequests(query: UserRequestQueryDto, req: expressRequest) {
    try {
      const decode: Decode = jwt_decode(req?.headers?.authorization);
      return await this.requestModel
        .find({ bsId: decode?.bsId })
        .sort({ createdAt: 'descending' })
        .skip(+query?.skip)
        .limit(+query?.limit);
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
