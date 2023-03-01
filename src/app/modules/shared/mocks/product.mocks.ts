import { Product } from './../../core/components/product-list/_models/product.model';
import { featuresMocks } from './feature.mocks';
export const productsMocks: Product[] = [
  {
    id: 1,
    code: 1,
    name: 'Product 1',
    price: 120,
    lastUpdated: new Date(),
    features: featuresMocks,
  },
  {
    id: 2,
    code: 2,
    name: 'Product 2',
    price: 90,
    lastUpdated: new Date(),
    features: featuresMocks,
  },
  {
    id: 3,
    code: 3,
    name: 'Product 3',
    price: 150,
    lastUpdated: new Date(),
    features: featuresMocks,
  },
];
