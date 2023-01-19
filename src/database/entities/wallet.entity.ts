import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'wallet',
})
class WalletEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public balance: number;
}

export default WalletEntity;
