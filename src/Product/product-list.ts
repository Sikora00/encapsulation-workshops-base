import Product from './product';

export default class ProductList {
  private products: Product[] = [];

  constructor(products: Product[] = []) {
    this.products = products;
  }

  addProduct(product: Product): void {
    this.products.push(product);
  }

  removeProduct(product: Product): void {
    this.products = this.products.filter((p) => p !== product);
  }
}
