import { Feature } from './../../../features/_models/feature.model';
export interface ProductFilter {
  name: string;
  features: Feature[];
  price:number [];
}
