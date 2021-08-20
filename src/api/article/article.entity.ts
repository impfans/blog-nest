import { string } from '@hapi/joi';
import { Base } from 'src/base/base.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from '../category/category.entity';

@Entity()
export class Article extends Base{
  @Column({length:100})
  title: string;
  @Column('int')
  cid: number;
  @Column({length:200})
  desc: string;
  @Column({length:40})
  creator: string;
  @Column('longtext')
  content: string;
  @Column({length:250})
  img: string;
  @ManyToOne(() => Category,category => category)
  @JoinColumn({name: 'cid'})
  category: Category;
}
