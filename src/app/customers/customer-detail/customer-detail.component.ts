import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerDetail } from '../../models/customers.interface';
import { MatTableDataSource } from '@angular/material/table';
import { OrderAttributes } from '../../models/orders.interface';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrl: './customer-detail.component.css'
})
export class CustomerDetailComponent implements OnInit {

  declare customerData: CustomerDetail;
  
  dataSource = new MatTableDataSource<OrderAttributes>();
  displayedColumns = ['id', 'totalAmount', 'paymentMethod', 'createdAt', 'actions'];
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ){}
  
  ngOnInit(): void {
    this.customerData = this.route.snapshot.data['customer'];
    this.dataSource.data = this.customerData.orders;
  }
  
  view(id:number){
    this.router.navigateByUrl(`/orders/${id}`);
  }
}
