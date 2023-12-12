import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateCustomersComponent } from "./create-customers/create-customers.component";
import { ViewCustomersComponent } from './view-customers/view-customers.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { customerResolver } from '../services/customer.resolver';

const routes: Routes = [
  { path: 'create', component: CreateCustomersComponent },
  { path: 'view', component: ViewCustomersComponent },
  { 
    path: ':id', 
    component: CustomerDetailComponent,
    resolve: { customer: customerResolver}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule { }
