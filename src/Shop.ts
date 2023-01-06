import PurchasedProduct from "./Product/PurchasedPoduct";
import ToBuyProduct from "./Product/ToBuyProduct";
import Wallet from "./Wallet";

export default class Shop {
  private shopGoods: ToBuyProduct[];
  private wallet: Wallet;

  constructor(shopGoods: ToBuyProduct[] = [], wallet: Wallet = new Wallet()) {
    this.shopGoods = shopGoods;
    this.wallet = wallet;
  }

  addShopGoods(shopGoods: ToBuyProduct): void {
    this.shopGoods.push(shopGoods);
  }

  removeShopGoods(shopGoods: ToBuyProduct): void {
    this.shopGoods = this.shopGoods.filter((p) => p !== shopGoods);
  }

  sellProduct(product: ToBuyProduct, quantity: number): PurchasedProduct {
    const shopGoods = this.findProductBySku(product);
    const purchasedProduct = shopGoods.sell(quantity);
    purchasedProduct.depositProfit(this.wallet);

    return purchasedProduct;
  }

  findProductBySku(product: ToBuyProduct): ToBuyProduct {
    const shopGoods = this.shopGoods.find((p) => p.equalSku(product));

    if (!shopGoods) {
      throw new Error("Shop has not this product");
    }

    return shopGoods;
  }
}
