import ProductList from "./ProductList";
import Shop from "./Shop";
import Wallet from "./Wallet";
import ProductDTO from "./dtos/ProductDTO";

export default class Person {
    private name: string;
    private cash: number;
    private wallet: Wallet;

    public productList: ProductList;
      
    constructor(name: string, cash: number = 0, wallet: Wallet = new Wallet(),  productList: ProductList = new ProductList()) {
        this.name = name;
        this.cash = cash;
        this.productList = productList;
        this.wallet = wallet;
    }

    withdrawMoneyFromWallet(amount: number): Person {
        this.wallet.withdraw(amount);
        this.cash += amount;

        return this;
    }

      
    buyProductUsingWallet(product: ProductDTO): void {
        try {
            this.wallet.withdraw(product.price);
        } catch (e) {
            throw new Error('You have not enough money to buy it');
        }

        this.productList.addProduct(product);
    }

    buyProductUsingCash(product: ProductDTO): void {
        if (this.cash < product.price) {
            throw new Error('You have not enough money to buy it');
        }

        this.cash -= product.price;
        this.productList.addProduct(product);
    }


    buyProductFromShopUsingWallet(product: ProductDTO, shop: Shop, wallet: Wallet): void {
        wallet.withdraw(product.price);

        shop.sellProduct(product, 1);

        this.productList.addProduct(product);
    }
}