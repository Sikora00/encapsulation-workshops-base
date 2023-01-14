import Person from 'src/person/person.entity';
import { Product } from 'src/product/product.entity';
import Shop from 'src/shop/shop.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinTable,
  ManyToMany,
} from 'typeorm';

@Entity()
export class PersonProducts {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cost: number;

  @ManyToMany((type) => Product) @JoinTable() products: Product[];

  @ManyToOne((type) => Person, (person) => person.products) person: Person;
}
