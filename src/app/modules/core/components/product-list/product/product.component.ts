import { Product } from './../_models/product.model';
import { ProductService } from './../../../../services/product.service';
import { Feature } from './../../features/_models/feature.model';
import { featuresMocks } from './../../../../shared/mocks/feature.mocks';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  form!: FormGroup;
  features!: Feature[];
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private productService: ProductService
  ) {
    this.form = this.fb.group({
      name: [null, [Validators.required]],
      price: [null, Validators.required],
      features: [null, [Validators.required]],
    });
  }
  public get Code(): FormControl {
    return this.form.get('code') as FormControl;
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
    this.features = featuresMocks;
  }
  onAdd() {
    debugger;
    // this.productService.getProductsObservable().subscribe((s: any) => {
    //   let s = s;
    // });
    if (!this.form.valid) return;
    let model = this.form.value as Product;

    this.productService.addProduct(model);
  }
}
