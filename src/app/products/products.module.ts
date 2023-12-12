import { NgModule } from '@angular/core';

import { ProductsRoutingModule } from './products-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CreateProductsComponent } from './create-products/create-products.component';
import { ViewProductsComponent } from './view-products/view-products.component';


@NgModule({
  declarations: [
    CreateProductsComponent,
    ViewProductsComponent,
  ],
  imports: [
    SharedModule,
    ProductsRoutingModule
  ]
})
export class ProductsModule { }
