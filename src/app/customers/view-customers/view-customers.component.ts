import { Component, OnInit } from '@angular/core';
import { CustomerOutput } from '../../models/customers.interface';
import { CustomersService } from '../../services/customers.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-view',
  templateUrl: './view-customers.component.html',
  styleUrl: './view-customers.component.css'
})
export class ViewCustomersComponent implements OnInit{

  constructor(
    private customerSVC: CustomersService,
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
    console.log(id);
  }
}
