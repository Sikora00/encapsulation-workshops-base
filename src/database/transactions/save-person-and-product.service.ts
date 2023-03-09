import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';
import { BaseTransaction } from './abstract.transaction';
import Person from '../../transaction/logic/Person';
import PersonEntity from '../entities/person.entity';
import PersonProductEntity from '../entities/person-products.entity';
import PersonProductsEntity from '../entities/person-products.entity';
import PurchasedProduct from '../../transaction/logic/PurchasedProduct';
import ProductEntity from '../entities/product.entity';
import WalletEntity from '../entities/wallet.entity';

interface SavePersonAndWalletData {
  product: ProductEntity;
  purchasedProduct: PurchasedProduct;
  person: Person;
}

@Injectable()
export class SavePersonAndProduct extends BaseTransaction<
  SavePersonAndWalletData,
  PersonProductsEntity
> {
  constructor(dataSource: DataSource) {
    super(dataSource);
  }

  protected async execute(
    { purchasedProduct, person, product }: SavePersonAndWalletData,
    manager: EntityManager,
  ): Promise<PersonProductsEntity> {
    const personProductEntity = new PersonProductEntity();
    const personEntity = new PersonEntity();

    personProductEntity.toEntity(purchasedProduct);
    personEntity.toEntity(person);

    personProductEntity.personId = personEntity.id;
    personProductEntity.productId = product.id;

    await manager.save(PersonProductEntity, personProductEntity);
    await manager.update(PersonEntity, personEntity, { id: personEntity.id });
    await manager.update(WalletEntity, personEntity.wallet, {
      id: personEntity.wallet.id,
    });

    return await manager.findOne(PersonProductsEntity, {
      where: { id: personProductEntity.id },
      relations: ['person', 'person.wallet', 'product'],
    });
  }
}
