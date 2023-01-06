import Product from "./Product/Product";

export default class ProductList {
  private products: Product[] = [];

  addProduct(product: Product): void {
    this.products.push(product);
  }

  removeProduct(product: Product): void {
    this.products = this.products.filter((p) => p !== product);
  }
}
