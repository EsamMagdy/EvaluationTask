import { NgModule } from '@angular/core';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputTextModule } from 'primeng/inputtext';
import { SliderModule } from 'primeng/slider';
import { TableModule } from 'primeng/table';
import {ButtonModule} from 'primeng/button';

@NgModule({
  declarations: [],
  imports: [MultiSelectModule, InputTextModule, SliderModule, TableModule,ButtonModule],
  exports: [MultiSelectModule, InputTextModule, SliderModule, TableModule,ButtonModule],
})
export class PrimeNgModule {}
