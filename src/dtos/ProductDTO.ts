export default class ProductDTO {
    public name: string;
    public price: number;
    public sku: string;

    constructor(name: string, price: number, sku: string = '') {
        this.name = name;
        this.price = price;
        this.sku = sku;
    }
}