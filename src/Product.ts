export default class Product {
    private name: string;
    private price: number;
    private sku: string;

    constructor(name: string, price: number, sku: string = '') {
        this.name = name;
        this.price = price;
        this.sku = sku;
    }
 
    getName(): string {
        return this.name;
    }
 
    getPrice(): number {
        return this.price;
    }

    getSku(): string {
        return this.sku;
    }

    setSku(sku: string): void {
        this.sku = sku;
    }
}