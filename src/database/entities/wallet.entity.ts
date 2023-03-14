import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import Wallet, { WalletSnapshot } from '../../transaction/models/Wallet';
import { ToEntity, ToModel } from '../../common/interfaces/model.interface';

@Entity({
  name: 'wallet',
})
class WalletEntity
  extends BaseEntity
  implements ToModel<Wallet>, ToEntity<WalletEntity>
{
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public balance: number;

  public toModel(): Wallet {
    return new Wallet(this.id, this.balance);
  }

  toEntity(walletSnapshot: WalletSnapshot): WalletEntity {
    const walletEntity = new WalletEntity();

    walletEntity.balance = walletSnapshot.balance;
    walletEntity.id = walletSnapshot.id;

    return walletEntity;
  }
}

export default WalletEntity;
