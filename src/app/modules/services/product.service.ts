import { LocalStorageService } from './local-storage.service';
import { Product } from './../core/components/product-list/_models/product.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductService {
  constructor(private localStorageService: LocalStorageService) {}
  private products: Product[] = [];

  products$ = new Subject<Product[]>();
  aa = new Subject<string>();

  initProducts() {
    debugger;

    let productsSaved = this.getProducts();

    if (!productsSaved || !productsSaved.length) {
      this.populateProduct();
      return;
    }

    this.products.push(...productsSaved);

    this.products$.next(this.products);
  }
  populateProduct() {
    let productsToPopualte: Product[] = [
      {
        id: 1,
        code: 1,
        name: 'Product 1',
        price: 120,
        lastUpdated: new Date(),
      },
      {
        id: 2,
        code: 2,
        name: 'Product 2',
        price: 90,
        lastUpdated: new Date(),
      },
      {
        id: 3,
        code: 3,
        name: 'Product 3',
        price: 150,
        lastUpdated: new Date(),
      },
    ];

    this.products.push(...productsToPopualte);

    this.products$.next(this.products);
    this.localStorageService.Products = this.products;
  }

  addProduct(product: Product) {
    if (!product) return;

    product.lastUpdated = new Date();

    this.products.push(product);
    this.products$.next(this.products);

    this.localStorageService.Products = this.products;
  }
  getLastProductCode() {
    let last = this.products[this.products.length - 1];

    return last ? last.code : 1;
  }
  getProductsObservable() {
    return this.products$.asObservable();
  }
  getProducts() {
    return this.localStorageService.Products;
  }
  deleteProducts(ids: number[]) {
    debugger;
    let selectedProducts = this.products.filter((s) => !ids.includes(s.id));

    this.products = [];
    this.products.push(...selectedProducts);
    this.localStorageService.Products = this.products;
    this.products$.next(this.products);
  }
}
