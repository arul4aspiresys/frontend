import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateCustomersComponent } from "./create-customers/create-customers.component";
import { ViewCustomersComponent } from './view-customers/view-customers.component';

const routes: Routes = [
  { path: 'create', component: CreateCustomersComponent },
  { path: 'view', component: ViewCustomersComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule { }
