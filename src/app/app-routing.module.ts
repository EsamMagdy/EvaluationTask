import { ProductComponent } from './modules/core/components/product-list/product/product.component';
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

    component: ProductComponent,
  },
  {
    path: 'edit-product:/id',

    component: ProductComponent,
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
