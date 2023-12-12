import { Component, OnInit } from '@angular/core';
import { OrderDetailAttributes, OrderOutput } from '../../models/orders.interface';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { ProductsService } from '../../services/products.service';
import { ProductOutput } from '../../models/products.interface';
import { CustomersService } from '../../services/customers.service';
import { CustomerOutput } from '../../models/customers.interface';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.css'
})
export class OrderDetailComponent implements OnInit {

  declare orderData: OrderOutput;
  declare products: ProductOutput[];
  declare customers: CustomerOutput[];

  dataSource = new MatTableDataSource<OrderDetailAttributes>();
  displayedColumns = ['productID', 'quantity', 'createdAt'];
  
  constructor(
    private route: ActivatedRoute,
    private productsSVC: ProductsService,
    private customersSVC: CustomersService,
  ){}
  
  ngOnInit(): void {
    this.orderData = this.route.snapshot.data['order'];
    forkJoin([
      this.productsSVC.getAll(),
      this.customersSVC.getAll()
    ]).subscribe( response => {
      if(response && response.length > 0) {
        this.products = response[0];
        this.customers = response[1];
      }
    });
    this.dataSource.data = this.orderData.orderDetails;
  }

  getProductName(id: number) {
    return this.products.find(el => el.id == id)?.name;
  }

  getCustomerName(id: number) {
    return this.customers.find( el => el.id == id)?.name;
  }
}
