export interface Product {
  id: number;
  code: number;
  name: string;
  price: number;
  lastUpdated?: Date;
  isChecked?: boolean;
}
