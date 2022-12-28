import {
  BadRequestException,
  Injectable,
  // UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRequestDto, RequestQueryDto, UpdateDto } from './dto';
import { Request, RequestDocument } from './schemas';
import { User, UserDocument } from '../auth/schemas/user.schema';
import { CreateResponse, Status } from './types';

@Injectable()
export class RequestService {
  constructor(
    @InjectModel(Request.name) private requestModel: Model<RequestDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async createRequestItem(
    requestDto: CreateRequestDto,
    user: any,
  ): Promise<CreateResponse> {
    try {
      let newReq = {
        ...requestDto,
        bsId: user?.bsid,
        requestedUserId: user?._id,
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

  async findAllRequests(query: RequestQueryDto, user) {
    try {
      if (user?.role === 'EMPLOYEE') {
        const findQuery =
          query.status === 'All'
            ? { bsId: user?.bsid, isActive: true }
            : { status: query?.status, bsId: user?.bsid, isActive: true };
        return await this.requestModel
          .find(findQuery)
          .populate('requestedUserId', '-hash')
          .sort({ createdAt: 'descending' })
          .skip(+query?.skip)
          .limit(+query?.limit);
      } else {
        let queries = {
          'address.branch': user?.office?.branch,
          'address.floor': user?.office?.floor,
          isActive: true,
        };
        const findQuery =
          query?.status === 'All'
            ? {
                ...queries,
              }
            : query?.status === 'Served'
            ? {
                status: query?.status,
                ...queries,
                servedUserId: user?._id,
              }
            : { status: query?.status, ...queries };
        return await this.requestModel
          .find(findQuery)
          .populate('requestedUserId', '-hash')
          .populate('servedUserId', '-hash')
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
        .populate('requestedUserId', '-hash')
        .populate('servedUserId', '-hash');
    } catch (error) {
      throw new BadRequestException('Something Unexpected');
    }
  }

  async disableRequest(id: string) {
    try {
      let newStatus = {
        isActive: false,
      };
      await this.requestModel.findByIdAndUpdate(id, newStatus, {
        new: true,
      });

      return {
        status: 'Success',
        message: 'Disable Request successfully',
      };
    } catch (error) {
      throw new BadRequestException('Something Unexpected');
    }
  }

  async updateStatus(id: string, updateDto: UpdateDto, user): Promise<Status> {
    try {
      let newStatus = {
        status: updateDto?.status,
        servedUserId: user?._id,
      };
      await this.requestModel.findByIdAndUpdate(id, newStatus, {
        new: true,
      });

      return {
        status: 'Success',
        message: 'Updated Status successfully',
      };
    } catch (error) {
      throw new BadRequestException('Something Unexpected');
    }
  }
}
