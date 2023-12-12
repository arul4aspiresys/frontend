import { NgModule } from '@angular/core';

import { CustomersRoutingModule } from './customers-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CreateCustomersComponent } from './create-customers/create-customers.component';
import { ViewCustomersComponent } from './view-customers/view-customers.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';


@NgModule({
  declarations: [
    CreateCustomersComponent,
    ViewCustomersComponent,
    CustomerDetailComponent,
  ],
  imports: [
    SharedModule,
    CustomersRoutingModule
  ]
})
export class CustomersModule { }
