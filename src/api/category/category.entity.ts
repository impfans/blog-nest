import { Base } from "src/base/base.entity";
import { Column, Entity, OneToMany } from "typeorm";
import { Article } from "../article/article.entity";

@Entity()
export class Category extends Base{
    @Column({length:20})
    name: string;
    @OneToMany(() => Article,article => article.category)
    articles: Article[];
}
