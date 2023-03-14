import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ToEntity, ToModel } from '../../common/interfaces/model.interface';
import { Product, ProductSnapshot } from '../../transaction/models/Product';

@Entity({
  name: 'product',
})
class ProductEntity
  extends BaseEntity
  implements ToEntity<ProductEntity>, ToModel<Product>
{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  cost: number;

  @Column()
  stock: number;

  toEntity(snapshot: ProductSnapshot): ProductEntity {
    this.id = snapshot.id;
    this.name = snapshot.name;
    this.cost = snapshot.price;
    this.stock = snapshot.stock;

    return this;
  }

  toModel(): Product {
    return new Product(this.id, this.name, this.stock, this.cost);
  }
}

export default ProductEntity;
