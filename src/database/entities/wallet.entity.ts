import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import Wallet from '../../transaction/logic/Wallet';

@Entity({
  name: 'wallet',
})
class WalletEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public balance: number;

  public toModel(): Wallet {
    return new Wallet(this.balance);
  }
}

export default WalletEntity;
