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
    return new Wallet(this.balance, this.id);
  }

  public toEntity(wallet: Wallet): WalletEntity {
    const walletSnapshot = wallet.toSnapshot();

    this.balance = walletSnapshot.balance;
    this.id = walletSnapshot.id;

    return this;
  }

  static toEntity(wallet: Wallet): WalletEntity {
    const walletSnapshot = wallet.toSnapshot();

    const walletEntity = new WalletEntity();

    walletEntity.balance = walletSnapshot.balance;
    walletEntity.id = walletSnapshot.id;

    return walletEntity;
  }
}

export default WalletEntity;
