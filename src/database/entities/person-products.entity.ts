import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import ProductEntity from './product.entity';
import PersonEntity from './person.entity';

@Entity({
  name: 'person-product',
})
class PersonProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ProductEntity)
  @JoinColumn()
  product: ProductEntity;

  @ManyToOne(() => PersonEntity)
  @JoinColumn()
  person: PersonEntity;

  quantity: number;
}

export default PersonProductEntity;
