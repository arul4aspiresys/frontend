import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateOrdersComponent } from './create-orders/create-orders.component';
import { ViewOrdersComponent } from './view-orders/view-orders.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { orderResolver } from '../services/order.resolver';

const routes: Routes = [
  { path: 'create', component: CreateOrdersComponent },
  { path: 'view', component: ViewOrdersComponent },
  {
    path: ':id',
    component: OrderDetailComponent,
    resolve: {
      order: orderResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
