import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Cat } from './cat.entity';

@Entity()
export class CatMeta {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne((type) => Cat)
  @JoinColumn()
  cat: Cat;

  @Column()
  name: string;
}
