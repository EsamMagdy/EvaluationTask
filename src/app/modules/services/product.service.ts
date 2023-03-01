import { LocalStorageService } from './local-storage.service';
import { Product } from './../core/components/product-list/_models/product.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { productsMocks } from '../shared/mocks/product.mocks';

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
    let productsToPopualte: Product[] = productsMocks;

    this.products.push(...productsToPopualte);

    this.products$.next(this.products);
    this.localStorageService.Products = this.products;
  }

  addProduct(product: Product) {
    if (!product) return;

    product.id = this.getLastProductId() + 1;
    product.code = this.getLastProductCode() + 1;
    
    product.lastUpdated = new Date();

    this.products.push(product);
    this.products$.next(this.products);

    this.localStorageService.Products = this.products;
  }
  getLastProductCode() {
    let last = this.products[this.products.length - 1];

    return last ? last.code : 1;
  }
  getLastProductId() {
    let last = this.products[this.products.length - 1];

    return last ? last.id : 1;
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
