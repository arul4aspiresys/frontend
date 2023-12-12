import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { CustomerOutput } from '../../models/customers.interface';
import { CustomersService } from '../../services/customers.service';

@Component({
  selector: 'app-view',
  templateUrl: './view-customers.component.html',
  styleUrl: './view-customers.component.css'
})
export class ViewCustomersComponent implements OnInit{

  constructor(
    private customerSVC: CustomersService,
    private router: Router,
  ){}
  
  dataSource = new MatTableDataSource<CustomerOutput>()
  
  displayedColumns: string[] = [ 'id', 'name', 'mobile', 'createdAt', 'actions' ];
  
  ngOnInit(): void {
    this.customerSVC.getAll().subscribe( response => {
      if(response) {
        this.dataSource.data = response;
      } 
    });
  }
  view(id: number){
    this.router.navigateByUrl(`/customers/${id}`);
  }
}
