import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { AddProductComponent } from './components/product-list/add-product/add-product.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AddProductComponent,
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
    BrowserAnimationsModule
  ],
  exports: [
    AddProductComponent,
    FooterComponent,
    NavbarComponent,
    ProductListComponent,
    SidebarComponent,
    ToastrModule
  ],
})
export class CoreModule {}
