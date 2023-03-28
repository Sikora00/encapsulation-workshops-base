import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';
import { BaseTransaction } from './abstract.transaction';
import WalletEntity from '../entities/wallet.entity';
import { WalletSnapshot } from '../../transaction/models/Wallet';
import { ShopSnapshot } from '../../transaction/models/Shop';
import ShopEntity from '../entities/shop.entity';

interface SaveAfterShopTransactionDataProps {
  shopSnapshot: ShopSnapshot;
  buyerWalletSnapshot: WalletSnapshot;
}

@Injectable()
export class SaveAfterShopTransactionData extends BaseTransaction<
  SaveAfterShopTransactionDataProps,
  boolean
> {
  constructor(dataSource: DataSource) {
    super(dataSource);
  }

  protected async execute(
    { shopSnapshot, buyerWalletSnapshot }: SaveAfterShopTransactionDataProps,
    manager: EntityManager,
  ): Promise<boolean> {
    const shopRepository = manager.getRepository(ShopEntity);

    const entityName = await shopRepository.findOneBy({ id: shopSnapshot.id });

    Object.assign(entityName, shopSnapshot);

    await shopRepository.save(entityName);

    await manager.update(
      WalletEntity,
      {
        id: buyerWalletSnapshot.id,
      },
      buyerWalletSnapshot,
    );

    return true;
  }
}
