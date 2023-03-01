import { PrimeNgModule } from './../shared/primeng.module';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProductComponent } from './components/product-list/product/product.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    ProductComponent,
    FooterComponent,
    NavbarComponent,
    ProductListComponent,
    SidebarComponent,
  ],
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-top-right',
      closeButton: true,
      enableHtml: true,
    }),
    BrowserAnimationsModule,
    NgMultiSelectDropDownModule.forRoot(),
    NgSelectModule,
    PrimeNgModule,
  ],
  exports: [
    ProductComponent,
    FooterComponent,
    NavbarComponent,
    ProductListComponent,
    SidebarComponent,
    ToastrModule,
    NgMultiSelectDropDownModule,
    NgSelectModule,
  ],
})
export class CoreModule {}
