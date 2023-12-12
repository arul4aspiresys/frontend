import { NgModule } from '@angular/core';

import { OrdersRoutingModule } from './orders-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CreateOrdersComponent } from './create-orders/create-orders.component';
import { ViewOrdersComponent } from './view-orders/view-orders.component';


@NgModule({
  declarations: [
    CreateOrdersComponent,
    ViewOrdersComponent,
  ],
  imports: [
    SharedModule,
    OrdersRoutingModule
  ]
})
export class OrdersModule { }
