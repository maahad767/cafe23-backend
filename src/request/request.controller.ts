import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Req,
  Query,
  Get,
  Param,
} from '@nestjs/common';
import { RequestService } from './request.service';
import { CreateRequestDto, RequestQueryDto, UserRequestQueryDto } from './dto';
import { Request } from 'express';
import { CreateResponse } from './types';

@Controller('request')
export class RequestController {
  constructor(private readonly requestService: RequestService) {}

  @Post()
  requestItem(
    @Body() reqDto: CreateRequestDto,
    @Req() req: Request,
  ): Promise<CreateResponse> {
    return this.requestService.createRequestItem(reqDto, req);
  }

  @Get()
  async getRequests(@Query() query: RequestQueryDto, @Req() req: Request) {
    return await this.requestService.findAllRequests(query, req);
  }

  @Get(':id')
  async getUserRequests(
    @Query() query: UserRequestQueryDto,
    @Req() req: Request,
  ) {
    return await this.requestService.findAllUserRequests(query, req);
  }

  @Get('info/:id')
  async getRequestDetails(@Param('id') id: string) {
    return await this.requestService.findRequestDetails(id);
  }
}
