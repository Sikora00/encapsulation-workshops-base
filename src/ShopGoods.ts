import Product from "./Product";

export default class ShopGoods extends Product {
    private quantity: number;
 
    constructor(name: string, price: number, sku: string, quantity: number) {
        super(name, price, sku);
        this.quantity = quantity;
    }
 
    getQuantity(): number {
        return this.quantity;
    }
 
    setQuantity(quantity: number): void {
        this.quantity = quantity;
    }
 
    addQuantity(quantity: number): void {
        this.quantity += quantity;
    }
 
    removeQuantity(quantity: number): void {
        this.quantity -= quantity;
    }
}