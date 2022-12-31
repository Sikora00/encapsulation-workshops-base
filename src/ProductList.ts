import ProductDTO from "./dtos/ProductDTO";

export default class ProductList {
    private products: ProductDTO[] = [];
 
    addProduct(product: ProductDTO): void {
        this.products.push(product);
    }
 
    removeProduct(product: ProductDTO): void {
        this.products = this.products.filter(p => p !== product);
    }
}