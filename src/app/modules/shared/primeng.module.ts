import { NgModule } from '@angular/core';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputTextModule } from 'primeng/inputtext';
@NgModule({
  declarations: [],
  imports: [MultiSelectModule, InputTextModule],
  exports: [MultiSelectModule, InputTextModule],
})
export class PrimeNgModule {}
