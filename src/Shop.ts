import Product from "./Product";
import ShopGoods from "./ShopGoods";
import Wallet from "./Wallet";

export default class Shop {
    private shopGoods: ShopGoods[];
    private wallet: Wallet;
  
    constructor() {
        this.shopGoods = [];
        this.wallet = new Wallet();
    }

    addShopGoods(shopGoods: ShopGoods): void {
        this.shopGoods.push(shopGoods);
    }

    removeShopGoods(shopGoods: ShopGoods): void {
        this.shopGoods = this.shopGoods.filter(p => p !== shopGoods);
    }

    sellProduct(product: Product, quantity: number): void {
        const shopGoods = this.findProductBySku(product.getSku());

        if (shopGoods.getQuantity() < quantity) {
            throw new Error(`There is no ${product.getName()} available right now to buy`);
        }

        shopGoods.removeQuantity(quantity);
        this.wallet.addMoney(product.getPrice() * quantity);
    }

    findProductBySku(sku: string): ShopGoods {
        const shopGoods = this.shopGoods.find(p => p.getSku() === sku);

        if (!shopGoods) {
            throw new Error('Shop has not this product');
        }

        return shopGoods;
    }

    getWallet(): Wallet {
        return this.wallet;
    }

    setShopGoods(shopGoods: ShopGoods[]): void {
        this.shopGoods = shopGoods;
    }

    getShopGoods(): ShopGoods[] {
        return this.shopGoods;
    }
}