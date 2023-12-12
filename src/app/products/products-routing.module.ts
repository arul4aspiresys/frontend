import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateProductsComponent } from './create-products/create-products.component';
import { ViewProductsComponent } from './view-products/view-products.component';

const routes: Routes = [
  { path: 'create', component: CreateProductsComponent },
  { path: 'view', component: ViewProductsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
