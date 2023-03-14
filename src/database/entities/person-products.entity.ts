import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import ProductEntity from './product.entity';
import PersonEntity from './person.entity';
import PurchasedProduct from '../../transaction/models/PurchasedProduct';
import { ToEntity, ToModel } from '../../common/interfaces/model.interface';
import { PersonProduct } from '../../transaction/models/PersonProduct';

@Entity({
  name: 'person-product',
})
class PersonProductEntity
  extends BaseEntity
  implements ToEntity<PersonProductEntity>, ToModel<PersonProduct>
{
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

  toModel(): PersonProduct {
    return new PersonProduct(
      this.id,
      this.product.toModel(),
      this.person.toModel(),
      this.quantity,
    );
  }
}

export default PersonProductEntity;
