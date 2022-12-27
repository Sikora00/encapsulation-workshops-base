import Product from "./Product";
import ProductList from "./ProductList";
import Shop from "./Shop";
import Wallet from "./Wallet";

export default class Person {
    private name: string;
    private cash: number;

    private productList: ProductList;
      
    constructor(name: string, cash: number = 0, productList: ProductList = new ProductList()) {
        this.name = name;
        this.cash = cash;
        this.productList = productList;
    }
      
    getName(): string {
        return this.name;
    }

    getCash(): number {
        return this.cash;
    }

    setCash(cash: number): void {
        this.cash = cash;
    }

    addCash(cash: number): void {
        this.cash += cash;
    }

    removeCash(cash: number): void {
        this.cash -= cash;
    }

    buyProductUsingWallet(product: Product, wallet: Wallet): void {
        if (wallet.getBalance() < product.getPrice()) {
            throw new Error('You have not enough money to buy it');
        }

        wallet.withdrawMoney(product.getPrice());

        this.productList.addProduct(product);
    }

    buyProductUsingCash(product: Product): void {
        if (this.cash < product.getPrice()) {
            throw new Error('You have not enough money to buy it');
        }

        this.cash -= product.getPrice();
        this.productList.addProduct(product);
    }


    buyProductFromShopUsingWallet(product: Product, shop: Shop, wallet: Wallet): void {
        if (wallet.getBalance() < product.getPrice()) {
            throw new Error(`'You have not enough money to buy it'`);
        }

        wallet.withdrawMoney(product.getPrice());
        shop.sellProduct(product, 1);

        this.productList.addProduct(product);
    }


    getProductList(): ProductList {
        return this.productList;
    }
}