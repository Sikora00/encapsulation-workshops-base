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

  addShopGoods(products: ShopProduct): void {
    this.products.push(products);
  }

  removeShopGoods(products: ShopProduct): void {
    this.products = this.products.filter((p) => p !== products);
  }

  sellProduct(product: ShopProduct, quantity: number): PurchasedProduct {
    const products = this.findProductBySku(product);
    const purchasedProduct = products.sell(quantity);
    purchasedProduct.depositProfit(this.wallet);

    return purchasedProduct;
  }

  findProductBySku(product: ShopProduct): ShopProduct {
    const products = this.products.find((p) => p.isSkuEqual(product));

    if (!products) {
      throw new Error('Shop has not this product');
    }

    return products;
  }

  toSnapshot(): ShopSnapshot {
    return {
      id: this.id,
      products: this.products.map((p) => p.toSnapshot()),
      wallet: this.wallet.toSnapshot(),
    };
  }
}
