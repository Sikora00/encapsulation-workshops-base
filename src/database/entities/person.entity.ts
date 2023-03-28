import Wallet from './wallet.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Person from '../../transaction/models/Person';
import PersonProductEntity from './person-products.entity';
import WalletEntity from './wallet.entity';
import { ToEntity, ToModel } from '../../common/interfaces/model.interface';

@Entity({
  name: 'person',
})
class PersonEntity
  extends BaseEntity
  implements ToEntity<PersonEntity>, ToModel<Person>
{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => PersonProductEntity, (personProduct) => personProduct.person)
  products: PersonProductEntity[];

  @OneToOne(() => Wallet, {
    cascade: ['insert', 'update'],
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  wallet: Wallet;

  public toModel(): Person {
    return new Person(this.id, this.name, this.wallet.toModel());
  }

  public toEntity(person: Person): PersonEntity {
    const personSnapshot = person.toSnapshot();

    this.name = personSnapshot.name;
    this.id = personSnapshot.id;

    const wallet = new WalletEntity();

    this.wallet = wallet.toEntity(personSnapshot.wallet);

    return this;
  }
}

export default PersonEntity;
