import Product from "./ProductDTO";

export default class ShopGoodsDTO extends Product {
    private quantity: number;
 
    constructor(name: string, price: number, sku: string, quantity: number) {
        super(name, price, sku);
        this.quantity = quantity;
    }

    removeFromStock(quantity: number): void {
        if(this.quantity < quantity) {
            throw new Error(`There is no ${this.name} available right now to buy`);
        }

        this.quantity -= quantity;
    }

    isQuantityEnough(quantity: number): boolean {
        return this.quantity >= quantity;
    }
}