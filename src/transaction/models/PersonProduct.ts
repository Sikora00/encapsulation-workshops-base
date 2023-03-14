import { Snapshotting } from '../../common/interfaces/snapshotable.interface';
import { DatabaseId } from '../../common/types/id.type';
import { Product, ProductSnapshot } from './Product';
import Person, { PersonSnapshot } from './Person';

export class PersonProductSnapshot {
  id?: DatabaseId;
  product: ProductSnapshot;
  person: PersonSnapshot;
  quantity: number;
}

export class PersonProduct implements Snapshotting<PersonProductSnapshot> {
  constructor(
    private id: DatabaseId,
    private product: Product,
    private person: Person,
    private quantity: number,
  ) {}

  toSnapshot(): PersonProductSnapshot {
    return {
      id: this.id,
      person: this.person.toSnapshot(),
      product: this.product.toSnapshot(),
      quantity: this.quantity,
    };
  }
}
