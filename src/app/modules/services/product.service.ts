import { Feature } from './../core/components/features/_models/feature.model';
import { LocalStorageService } from './local-storage.service';
import { Product } from './../core/components/product-list/_models/product.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { productsMocks } from '../shared/mocks/product.mocks';
import { ProductFilter } from '../core/components/product-list/product-filter/_models/product-filter.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  constructor(private localStorageService: LocalStorageService) {}
  private products: Product[] = [];

  products$ = new Subject<Product[]>();
  aa = new Subject<string>();

  initProducts() {
    debugger;

    let productsSaved = this.getProducts();

    // if (!productsSaved || !productsSaved.length) {
    //   this.populateProduct();
    //   this.sortProduct('name');
    //   return;
    // }

    this.products = productsSaved;
    // this.sortProduct('name');
    this.products$.next(this.products);
  }
  populateProduct() {
    let productsToPopualte: Product[] = productsMocks;

    this.products.push(...productsToPopualte);

    this.products$.next(this.products);
    this.localStorageService.Products = this.products;
  }
  getProductById(id: number) {
    let product = this.getProducts().find((product) => product.id == id);

    if (!product) return null;

    return product;
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
  editProduct(id: number, model: Product) {
    debugger;
    this.products = this.getProducts();

    let productIndex = this.products.findIndex(
      (product: Product) => product.id == id
    );

    let selectedProduct = this.products.find(
      (product: Product) => product.id == id
    );

    if (selectedProduct) {
      selectedProduct.name = model.name;
      selectedProduct.features = model.features;
      selectedProduct.lastUpdated = new Date();
      selectedProduct.price = model.price;

      this.products[productIndex] = selectedProduct;
      this.products$.next(this.products);

      this.localStorageService.Products = this.products;
    }
  }
  filterProducts(model: ProductFilter) {
    debugger;
    this.products = this.getProducts();

    if (model.name) {
      this.products = this.products.filter((product) =>
        product.name.toLowerCase().includes(model.name.toLowerCase())
      );
    }
    if (model.features && model.features.length) {
      let featuresIds = model.features.map((feature) => feature.id);
      this.filterByFeatures(featuresIds);
    }
    if (model.price && model.price.length) {
      this.products = this.products.filter(
        (s) => s.price >= model.price[0] && s.price <= model.price[1]
      );
    }

    this.products$.next(this.products);
  }
  getLastProductCode() {
    let last = this.products[this.products.length - 1];

    return last ? last.code : 0;
  }
  getLastProductId() {
    let last = this.products[this.products.length - 1];

    return last ? last.id : 0;
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

  filterByFeatures(featuresIds: number[]) {
    let products: Product[] = [];

    this.products.forEach((product) => {
      let productFeaturesIds = product.features.map((f) => f.id);
      if (this.featureExist(productFeaturesIds, featuresIds))
        products.push(product);
    });

    this.products = products;
  }

  featureExist(productFeaturesIds: number[], filterdFeaturesIds: number[]) {
    return productFeaturesIds.some((id) => {
      return filterdFeaturesIds.includes(id);
    });
  }
  sortProduct(
    sortOrder:
      | 'name'
      | 'name_desc'
      | 'price'
      | 'price_desc'
      | 'date'
      | 'date_desc'
  ) {
    debugger;
    // this.products = this.products.sort(function (a, b) {
    //   return a.name.localeCompare(b.name) || a.price - b.price;
    // });
    switch (sortOrder) {
      case 'name':
        this.products = this.products.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        break;
      case 'name_desc':
        this.products = this.products.sort((a, b) =>
          b.name.localeCompare(a.name)
        );
        break;
      case 'price':
        this.products = this.products.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        this.products = this.products.sort((a, b) => b.price - a.price);
        break;
      case 'date':
        this.products = this.products.sort(
          (a, b) => a.lastUpdated.getTime() - b.lastUpdated.getTime()
        );
        break;
      case 'date_desc':
        this.products = this.products.sort(
          (a, b) => b.lastUpdated.getTime() - a.lastUpdated.getTime()
        );
        break;
      default:
        break;
    }
  }
}
