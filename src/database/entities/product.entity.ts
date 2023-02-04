import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'product',
})
class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  cost: number;

  @Column()
  stock: number;
}

export default ProductEntity;
