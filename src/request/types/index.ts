import { Request } from '../schemas';

export type Decode = { email: string; bsId: string; sub: string };

export type CreateResponse = { message: string; itemInfo: Request };

export type Status = { message: string; status: string };
