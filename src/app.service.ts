import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): [{ result: string; code: number }] {
    return [{ result: 'Hello World!', code: 200 }];
  }

  create(createCatDto): [{ result: string; code: number }] {
    return [{ result: 'Hello World!', code: 200 }];
  }
  findOne(id): [{ result: string; code: number }] {
    return [{ result: id, code: 200 }];
  }
}
