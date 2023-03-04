import { ProductService } from './../../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { filter, Subscription } from 'rxjs';
import {
  Location,
  LocationStrategy,
  PathLocationStrategy,
  PopStateEvent,
} from '@angular/common';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Product } from './_models/product.model';
import { ToastrService } from 'ngx-toastr';
import { SwalService } from 'src/app/modules/services/swal.service';
const Swal = require('sweetalert2');
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  pageNumber: number = 1;
  pageSize: number = 10;
  products!: Product[];
  /**
   *
   */
  constructor(
    private productService: ProductService,
    private toastr: ToastrService,
    private swalService: SwalService
  ) {}

  ngOnInit(): void {
    this.productService.getProductsObservable().subscribe((products) => {
      this.products = products;
    });
    this.productService.initProducts();
  }
  checkUncheckAll(checked: any) {
    this.products.forEach((c) => (c.isChecked = checked.checked));
  }
  deleteProducts(forChecked = false, ...ids: number[]) {
    if (forChecked) this.deleteProductsForChecked();
    else this.deleletProductFunc();
  }
  deleletProductFunc(...ids: number[]) {
    let idsString = ids.join(',');

    this.swalService
      .fireSwal(
        `Are you sure to delete products with ids ${idsString}`,
        "You won't be able to revert this!"
      )
      .then((result: any) => {
        if (result.value) {
          this.productService.deleteProducts(ids);
          this.toastr.success('Product has been deleted.');
        }
      });
  }
  deleteProductsForChecked() {
    let selectedProducts = this.products.filter((s) => s.isChecked);

    if (!selectedProducts.length) {
      this.toastr.error('Please check at least one product');
      return;
    }
    let ids = selectedProducts.map((s) => s.id);
    this.deleletProductFunc(...ids);
  }
}
