import { PersonProducts } from 'src/person-products/person-products.entity';
import Wallet from 'src/wallet/wallet.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
class Person {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @Column()
  public cash: number;

  @OneToOne((type) => Wallet)
  @JoinColumn()
  public wallet: Wallet;

  @OneToMany((type) => PersonProducts, (personProduct) => personProduct.person)
  products: PersonProducts[];
}

export default Person;
