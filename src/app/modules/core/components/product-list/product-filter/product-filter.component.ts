import { ProductService } from './../../../../services/product.service';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { featuresMocks } from 'src/app/modules/shared/mocks/feature.mocks';
import { Feature } from '../../features/_models/feature.model';
import { ProductFilter } from './_models/product-filter.model';
import { FeatureService } from 'src/app/modules/services/feature.service';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.scss'],
})
export class ProductFilterComponent implements OnInit {
  form!: FormGroup;
  features!: Feature[];
  rangeValues: number[] = [20, 300];
  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private featureService: FeatureService
  ) {
    this.form = this.fb.group({
      name: [null],
      price: [[20, 300]],
      features: [null],
    });
  }
  public get Name(): FormControl {
    return this.form.get('name') as FormControl;
  }
  public get Price(): FormControl {
    return this.form.get('price') as FormControl;
  }
  public get Features(): FormControl {
    return this.form.get('features') as FormControl;
  }
  ngOnInit() {
    debugger;
    this.featureService.getFeaturesObservable().subscribe((features) => {
      debugger;
      this.features = features;
    });
    this.featureService.initFeatures();
  }
  filter() {
    debugger;
    let model = this.form.value as ProductFilter;
    console.log(model);

    this.productService.filterProducts(model);
  }
  resetForm() {
    debugger;
    this.form.reset();
    this.Price.setValue([20, 300]);
  }
}
