import { Feature } from './../core/components/features/_models/feature.model';
import { LocalStorageService } from './local-storage.service';
import { Product } from './../core/components/product-list/_models/product.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ProductFilter } from '../core/components/product-list/product-filter/_models/product-filter.model';
import { featuresMocks } from '../shared/mocks/feature.mocks';

@Injectable({ providedIn: 'root' })
export class FeatureService {
  constructor(private localStorageService: LocalStorageService) {}
  private features: Feature[] = [];

  features$ = new Subject<Feature[]>();

  initFeatures() {
    let featuresSaved = this.getFeatures();

    this.features = featuresSaved;
    this.features$.next(this.features);
  }
  populateFeatures() {
    let featuresToPopualte: Feature[] = featuresMocks;

    this.features.push(...featuresToPopualte);

    this.features$.next(this.features);

    this.localStorageService.Features = this.features;
  }
  getFeatureById(id: number) {
    let feature = this.getFeatures().find((feature) => feature.id == id);

    if (!feature) return null;

    return feature;
  }
  addFeature(feature: Feature) {
    if (!feature) return;

    feature.id = this.getLastFeatureId() + 1;

    this.features.push(feature);

    this.features$.next(this.features);

    this.localStorageService.Features = this.features;
  }
  bulkAddFeature(features: Feature[]) {
    features.forEach((feature) => {
      this.addFeature(feature);
    });
  }
  editFeature(id: number, feature: Feature) {
    this.features = this.getFeatures();

    let featureIndex = this.features.findIndex(
      (feature: Feature) => feature.id == id
    );

    let selectedFeature = this.features.find(
      (feature: Feature) => feature.id == id
    );

    if (selectedFeature) {
      selectedFeature.name = feature.name;

      this.features[featureIndex] = selectedFeature;
      this.features$.next(this.features);

      this.localStorageService.Features = this.features;
    }
  }
  bulkEdit(features: Feature[]) {
    this.features = this.getFeatures();

    for (let index = 0; index < this.features.length; index++) {
      const element = this.features[index];

      let feature = features.find((s) => s.id == element.id);

      this.features[index] = feature ? feature : this.features[index];
    }

    this.features$.next(this.features);

    this.localStorageService.Features = this.features;
  }
  getLastFeatureId() {
    let last = this.features[this.features.length - 1];

    return last ? last.id : 0;
  }
  getFeaturesObservable() {
    return this.features$.asObservable();
  }
  getFeatures() {
    return this.localStorageService.Features;
  }
  deleteFeatures(id: number) {
    let selectedFeatures = this.features.filter((s) => id != s.id);

    this.features = [];
    this.features.push(...selectedFeatures);
    this.localStorageService.Features = this.features;
    this.features$.next(this.features);
    this.deleteFeatureFromProduct(id);
  }

  isFeatureRelatedToProduct(featureId: number) {
    let products = this.localStorageService.Products;

    return products.some((product) => {
      let productFeatureIds = product.features.map((feature) => feature.id);

      return productFeatureIds.includes(featureId);
    });
  }
  deleteFeatureFromProduct(id: number) {
    let products = this.localStorageService.Products;

    for (let index = 0; index < products.length; index++) {
      const productFeatures = products[index].features;

      products[index].features = productFeatures.filter(
        (feature) => feature.id != id
      );
    }

    this.localStorageService.Products = products;
  }
  bulkDelete(featureIds: number[]) {
    let selectedFeatures = this.features.filter(
      (s) => !featureIds.includes(s.id)
    );

    this.features = [];
    this.features.push(...selectedFeatures);
    this.localStorageService.Features = this.features;
    this.features$.next(this.features);

    featureIds.forEach((featureId) => {
      this.deleteFeatureFromProduct(featureId);
    });
  }
}
