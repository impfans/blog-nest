import { CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export abstract class Base{
    @PrimaryGeneratedColumn()
    id: number;
    @CreateDateColumn({ type: 'datetime' })
    created_at: Date;
    @CreateDateColumn({ type: 'datetime' })
    updated_at: Date;
    @DeleteDateColumn({ type: 'datetime' ,default:null})
    deleted_at: Date;
}
