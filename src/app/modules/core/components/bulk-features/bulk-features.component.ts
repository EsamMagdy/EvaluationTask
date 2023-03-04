import { FeatureService } from './../../../services/feature.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../product-list/_models/product.model';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  FormArray,
} from '@angular/forms';
import { Feature } from '../features/_models/feature.model';
import { SwalService } from 'src/app/modules/services/swal.service';
const Swal = require('sweetalert2');
@Component({
  selector: 'app-bulk-features',
  templateUrl: './bulk-features.component.html',
  styleUrls: ['./bulk-features.component.scss'],
})
export class BulkFeaturesComponent implements OnInit {
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
      names: this.fb.array([]),
    });
  }
  public get Names(): FormArray {
    return this.form.get('names') as FormArray;
  }

  ngOnInit() {
    this.featureService.getFeaturesObservable().subscribe((features) => {
      this.features = features;
    });
    this.featureService.initFeatures();
  }

  addName() {
    let control = this.fb.group({
      name: [null, [Validators.required]],
    });
    this.Names.push(control);
  }
  removeName(i: number) {
    this.Names.removeAt(i);
  }
  isNameHasError(control: any) {
    return control.controls.name.hasError('required');
  }
  openModalFunc() {
    this.Names.clear();
    this.form.reset();
    this.openModal.nativeElement.click();
  }

  checkUncheckAll(checked: any) {
    this.features.forEach((c) => (c.isChecked = checked.checked));
  }
  bulkEdit() {
    this.featureService.bulkEdit(this.features);
    this.toastr.success(`Features has been updated.`);
  }
  deleteFeaturesForChecked() {
    let selectedFeatures = this.features.filter((s) => s.isChecked);

    if (!selectedFeatures.length) {
      this.toastr.error('Please check at least one feature');
      return;
    }

    let selectedFeatureIds = selectedFeatures.map((s) => s.id);

    let ids = selectedFeatureIds.filter((featureId) =>
      this.featureService.isFeatureRelatedToProduct(featureId)
    );

    let title = `Are you sure to delete feature with ids ${selectedFeatureIds.join(
      ','
    )}`;

    let text = ids.length
      ? `Note: this features with ids ${ids.join(',')} is assigned to product `
      : ``;

    this.swalService.fireSwal(title, text).then((result: any) => {
      if (result.value) {
        this.featureService.bulkDelete(selectedFeatureIds);
        this.toastr.success(
          `Feature with ids ${selectedFeatureIds.join(',')} has been deleted.`
        );
      }
    });
  }
  onAdd() {
    let controls = this.form.controls['names'] as FormArray;

    if (!controls.length) {
      this.toastr.error('Please add at least one feature');
      return;
    }

    if (!this.form.valid) return;

    let model = this.form.value as { names: [{ name: string }] };

    model.names.forEach((name) => {
      debugger;
      let feature = name as Feature;
      this.featureService.addFeature(feature);
    });

    this.closeModal.nativeElement.click();

    this.toastr.success('Features has been added successfully.');
  }
}
