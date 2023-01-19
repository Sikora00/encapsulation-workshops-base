import Wallet from './wallet.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

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

  @OneToOne(() => Wallet, { cascade: true, eager: true })
  @JoinColumn()
  wallet: Wallet;
}

export default PersonEntity;
