import { FeatureService } from './../../../../services/feature.service';
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
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  form!: FormGroup;
  features!: Feature[];
  selectedProduct!: any;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private productService: ProductService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private featureService: FeatureService
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
    debugger;
    this.featureService.getFeaturesObservable().subscribe((features) => {
      debugger;
      this.features = features;
    });
    this.featureService.initFeatures();
    // this.features = featuresMocks;

    this.route.params.subscribe((res) => {
      if (res && res['id']) {
        let id = parseInt(res['id']);
        this.getProductById(id);
      }
    });
  }
  getProductById(id: number) {
    debugger;
    this.selectedProduct = this.productService.getProductById(id);

    this.form.patchValue(this.selectedProduct);
  }
  onAdd() {
    if (!this.form.valid) return;

    let model = this.form.value as Product;

    /** for edit product */
    if (this.selectedProduct) {
      this.productService.editProduct(this.selectedProduct.id, model);
      this.toastr.success('Product has been updated successfully.');
      this.router.navigate(['/product-list']);
      return;
    }

    this.productService.addProduct(model);
    this.toastr.success('Product has been added successfully.');
    this.router.navigate(['/product-list']);
  }
}
