import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import ProductEntity from './product.entity';
import PersonEntity from './person.entity';
import PurchasedProduct from '../../transaction/logic/PurchasedProduct';

@Entity({
  name: 'person-product',
})
class PersonProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ProductEntity)
  @JoinColumn()
  product: ProductEntity;

  @Column()
  productId?: number;

  @ManyToOne(() => PersonEntity)
  @JoinColumn()
  person: PersonEntity;

  @Column()
  personId?: number;

  quantity: number;

  public toEntity(personProduct: PurchasedProduct): PersonProductEntity {
    const personProductSnapshot = personProduct.toSnapshot();

    this.quantity = personProductSnapshot.stock;

    return this;
  }
}

export default PersonProductEntity;
