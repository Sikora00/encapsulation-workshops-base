import Wallet, { WalletSnapshot } from './Wallet';
import PurchasedProduct from './PurchasedProduct';
import { Snapshotting } from '../../common/interfaces/snapshotable.interface';
import { DatabaseId } from '../../common/types/id.type';
import ShopProduct, { ShopProductSnapshot } from './ShopProduct';

export interface ShopSnapshot {
  id: DatabaseId;
  products: ShopProductSnapshot[];
  wallet: WalletSnapshot;
}

export default class Shop implements Snapshotting<ShopSnapshot> {
  private readonly id: DatabaseId;
  private products: ShopProduct[];
  private readonly wallet: Wallet;

  constructor(id: DatabaseId, products: ShopProduct[] = [], wallet: Wallet) {
    this.id = id;
    this.products = products;
    this.wallet = wallet;
  }

  sellProduct(productId: number, quantity: number): PurchasedProduct {
    const products = this.findProductByProductId(productId);
    const purchasedProduct = products.sell(quantity);
    purchasedProduct.depositProfit(this.wallet);

    return purchasedProduct;
  }

  findProductByProductId(productId: number): ShopProduct {
    const product = this.products.find((p) => p.isIdEqual(productId));

    if (!product) {
      throw new Error('Shop has not this product');
    }

    return product;
  }

  throwIfProductIsNotAvailable(productId: number) {
    const product = this.findProductByProductId(productId);

    product.throwErrorIfNotInStock();
  }

  toSnapshot(): ShopSnapshot {
    return {
      id: this.id,
      products: this.products.map((p) => p.toSnapshot()),
      wallet: this.wallet.toSnapshot(),
    };
  }
}
