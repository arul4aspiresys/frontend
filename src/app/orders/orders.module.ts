import { NgModule } from '@angular/core';

import { OrdersRoutingModule } from './orders-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CreateOrdersComponent } from './create-orders/create-orders.component';
import { ViewOrdersComponent } from './view-orders/view-orders.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';


@NgModule({
  declarations: [
    CreateOrdersComponent,
    ViewOrdersComponent,
    OrderDetailComponent,
  ],
  imports: [
    SharedModule,
    OrdersRoutingModule
  ]
})
export class OrdersModule { }
