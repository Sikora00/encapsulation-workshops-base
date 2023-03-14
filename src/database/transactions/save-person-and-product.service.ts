import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';
import { BaseTransaction } from './abstract.transaction';
import PersonProductEntity from '../entities/person-products.entity';
import PersonProductsEntity from '../entities/person-products.entity';
import WalletEntity from '../entities/wallet.entity';
import { PersonProductSnapshot } from '../../transaction/models/PersonProduct';
import { WalletSnapshot } from '../../transaction/models/Wallet';

interface SavePersonAndWalletData {
  personProduct: PersonProductSnapshot;
  wallet: WalletSnapshot;
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
    { personProduct, wallet }: SavePersonAndWalletData,
    manager: EntityManager,
  ): Promise<PersonProductsEntity> {
    await manager.save(PersonProductEntity, personProduct);
    await manager.update(
      WalletEntity,
      {
        id: wallet.id,
      },
      wallet,
    );

    return await manager.findOne(PersonProductsEntity, {
      where: {
        person: { wallet: { id: wallet.id } },
        productId: personProduct.id,
      },
      relations: ['person', 'person.wallet', 'product'],
    });
  }
}
