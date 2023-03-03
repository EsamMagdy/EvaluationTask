import { Feature } from './../core/components/features/_models/feature.model';
import { Product } from './../core/components/product-list/_models/product.model';
import { Injectable } from '@angular/core';
import { LocalStorageKeys } from '../shared/models/local-strorage-keys.model';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  get Products() {
    let productsStorage = localStorage.getItem(LocalStorageKeys.Product)!;

    if (!productsStorage) return [];

    return JSON.parse(productsStorage) as Product[];
  }
  set Products(products: Product[]) {
    // if (!products || !products.length) return;

    localStorage.setItem(LocalStorageKeys.Product, JSON.stringify(products));
  }
  get Features() {
    let featureStorage = localStorage.getItem(LocalStorageKeys.Feature)!;

    if (!featureStorage) return [];

    return JSON.parse(featureStorage) as Feature[];
  }
  set Features(features: Feature[]) {
    // if (!features || !features.length) return;

    localStorage.setItem(LocalStorageKeys.Feature, JSON.stringify(features));
  }
}
