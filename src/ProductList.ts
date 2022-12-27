import Product from "./Product";

export default class ProductList {
    private products: Product[] = [];
 
    addProduct(product: Product): void {
        this.products.push(product);
    }
 
    getProducts(): Product[] {
        return this.products;
    }
 
    removeProduct(product: Product): void {
        this.products = this.products.filter(p => p !== product);
    }
}