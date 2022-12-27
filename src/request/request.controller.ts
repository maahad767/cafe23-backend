import {
  Controller,
  Post,
  Body,
  Query,
  Get,
  Param,
  UseGuards,
  Put,
} from '@nestjs/common';
import { RequestService } from './request.service';
import { CreateRequestDto, RequestQueryDto, UpdateDto } from './dto';
import { CreateResponse, Status } from './types';
import { GetUser, Roles } from 'src/auth/decorators';
import { JwtAuthGuard, RolesGuard } from 'src/auth/guards';
import { User } from 'src/auth/schemas';

@Controller('request')
export class RequestController {
  constructor(private readonly requestService: RequestService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('EMPLOYEE')
  @Post()
  requestItem(
    @Body() reqDto: CreateRequestDto,
    @GetUser() user: User,
  ): Promise<CreateResponse> {
    return this.requestService.createRequestItem(reqDto, user);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getRequests(@Query() query: RequestQueryDto, @GetUser() user: User) {
    return await this.requestService.findAllRequests(query, user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('info/:id')
  async getRequestDetails(@Param('id') id: string) {
    return await this.requestService.findRequestDetails(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPPORT')
  @Put(':id')
  update(
    @Body() updateDto: UpdateDto,
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<Status> {
    return this.requestService.updateStatus(id, updateDto, user);
  }
}
