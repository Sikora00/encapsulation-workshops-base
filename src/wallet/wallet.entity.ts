import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Wallet {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public balance: number;
}

export default Wallet;
