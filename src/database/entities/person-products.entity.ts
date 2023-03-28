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

  @Column()
  quantity: number;

  public toEntity(personProduct: PersonProduct): PersonProductEntity {
    const snapshot = personProduct.toSnapshot();

    this.id = snapshot.id;
    this.quantity = snapshot.quantity;
    this.productId = snapshot.product.id;
    this.personId = snapshot.person.id;

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
