import { Feature } from './_models/feature.model';
import { FeatureService } from './../../../services/feature.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../product-list/_models/product.model';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { SwalService } from 'src/app/modules/services/swal.service';
const Swal = require('sweetalert2');
@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss'],
})
export class FeaturesComponent implements OnInit {
  @ViewChild('openModal') openModal!: ElementRef;
  @ViewChild('closeModal') closeModal!: ElementRef;
  features!: Feature[];
  clonedProducts: { [s: string]: Feature } = {};
  form!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private featureService: FeatureService,
    private swalService: SwalService
  ) {
    this.form = this.fb.group({
      name: [null, [Validators.required]],
    });
  }
  public get Name(): FormControl {
    return this.form.get('name') as FormControl;
  }
  ngOnInit() {
    this.featureService.getFeaturesObservable().subscribe((features) => {
      this.features = features;
    });
    this.featureService.initFeatures();
  }

  onRowEditInit(feature: Feature) {
    this.clonedProducts[feature.id] = { ...feature };
  }

  onRowEditSave(feature: Feature) {
    this.featureService.editFeature(feature.id, feature);
    this.toastr.success('Feature has been updated successfully.');
  }

  onRowEditCancel(product: Feature, index: number) {}
  openModalFunc() {
    this.form.reset();
    this.openModal.nativeElement.click();
  }
  onDeleteFeature(id: number) {
    let title = `Are you sure to delete feature with id ${id}`;
    let text = this.featureService.isFeatureRelatedToProduct(id)
      ? 'Note: this feature is assigned to product'
      : '';

    this.swalService.fireSwal(title, text).then((result: any) => {
      if (result.value) {
        this.featureService.deleteFeatures(id);
        this.toastr.success('Feature has been deleted.');
      }
    });
  }
  onAdd() {
    if (!this.form.valid) return;

    let model = this.form.value;

    this.featureService.addFeature(model);
    this.closeModal.nativeElement.click();

    this.toastr.success('Feature has been added successfully.');
  }
}
