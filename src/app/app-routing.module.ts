import { AddProductComponent } from './modules/core/components/product-list/add-product/add-product.component';
import { ProductListComponent } from './modules/core/components/product-list/product-list.component';
import { HomeComponent } from './pages/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'admin',
    pathMatch: 'full',
  },
  {
    path: 'product-list',

    component: ProductListComponent,
  },
  {
    path: 'add-product',

    component: AddProductComponent,
  },
  {
    path: '**',
    component: HomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
