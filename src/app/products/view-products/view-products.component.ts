import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ProductOutput } from '../../models/products.interface';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrl: './view-products.component.css'
})
export class ViewProductsComponent implements OnInit {

  constructor(
    private productsSVC: ProductsService,
  ) {}

  dataSource = new MatTableDataSource<ProductOutput>();
  displayedColumns: string[] = [ 'id', 'name', 'price', 'createdAt' ];
  ngOnInit(): void {
    this.productsSVC.getAll().subscribe( response => {
      if(response) {
        this.dataSource.data = response;
      }
    })
  }
  view(id: number) {}
}
