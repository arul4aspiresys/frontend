import { NgModule } from '@angular/core';

import { CustomersRoutingModule } from './customers-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CreateCustomersComponent } from './create-customers/create-customers.component';
import { ViewCustomersComponent } from './view-customers/view-customers.component';


@NgModule({
  declarations: [
    CreateCustomersComponent,
    ViewCustomersComponent,
  ],
  imports: [
    SharedModule,
    CustomersRoutingModule
  ]
})
export class CustomersModule { }
