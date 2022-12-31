import ProductDTO from "./dtos/ProductDTO";
import ShopGoodsDTO from "./dtos/ShopGoodsDTO";
import Wallet from "./Wallet";

export default class Shop {
    private shopGoods: ShopGoodsDTO[];
    private wallet: Wallet;
  
    constructor(shopGoods: ShopGoodsDTO[] = [], wallet: Wallet = new Wallet()) {
        this.shopGoods = shopGoods;
        this.wallet = wallet;
    }

    addShopGoods(shopGoods: ShopGoodsDTO): void {
        this.shopGoods.push(shopGoods);
    }

    removeShopGoods(shopGoods: ShopGoodsDTO): void {
        this.shopGoods = this.shopGoods.filter(p => p !== shopGoods);
    }

    sellProduct(product: ProductDTO, quantity: number): void {
        const shopGoods = this.findProductBySku(product.sku);

        shopGoods.removeFromStock(quantity);
        
        this.wallet.deposit(product.price * quantity);
    }

    findProductBySku(sku: string): ShopGoodsDTO {
        const shopGoods = this.shopGoods.find(p => p.sku === sku);

        if (!shopGoods) {
            throw new Error('Shop has not this product');
        }

        return shopGoods;
    }
}