import {  Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { CatMeta } from './cat-meta.entity';
import { Cat } from './cat.entity';

@Injectable()
export class CatService {
  constructor(
    @InjectRepository(Cat)
    private catRepository: Repository<Cat>,
    @InjectRepository(CatMeta)
    private catMetaRepository: Repository<CatMeta>,
  ) {}
  findAll() {
    return {data:'df',reqId:'321312'};
  }
  async create(params) {
    try {
      // const cat = new Cat();
      // cat.last_name = params.last_name;
      // cat.is_active = params.is_active;
      // cat.first_name = params.first_name;
      // cat.category = params.category;
      // this.catRepository.manager.save(cat);
      // const catMeta = new CatMeta();
      // catMeta.cat = cat;
      // catMeta.name = '测试123';
      // this.catMetaRepository.manager.save(catMeta);
      const useRep = await getRepository(CatMeta)
        .createQueryBuilder('catMeta')
        .leftJoinAndSelect('catMeta.cat', 'cat')
        .getMany();
      // return this.catRepository.insert(params);
      console.log(useRep);
      return useRep;
    } catch (error) {
      console.error(error);
    }
  }
}
