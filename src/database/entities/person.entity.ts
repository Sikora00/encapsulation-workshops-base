import Wallet from './wallet.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Person from '../../transaction/logic/Person';
import PersonProductEntity from './person-products.entity';

@Entity({
  name: 'person',
})
class PersonEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  cash: number;

  @OneToMany(() => PersonProductEntity, (personProduct) => personProduct.person)
  products: PersonProductEntity[];

  @OneToOne(() => Wallet, {
    cascade: ['insert'],
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  wallet: Wallet;

  public toModel(): Person {
    return new Person(this.name, this.cash, this.wallet.toModel(), this.id);
  }

  public toEntity(person: Person): PersonEntity {
    const personSnapshot = person.toSnapshot();

    this.name = personSnapshot.name;
    this.cash = personSnapshot.cash;
    this.id = personSnapshot.id;

    const walletEntity = new Wallet();
    this.wallet = walletEntity.toEntity(personSnapshot.wallet);

    return this;
  }
}

export default PersonEntity;
