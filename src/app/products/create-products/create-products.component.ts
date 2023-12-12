import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../../services/products.service';
import { NotificationService } from '../../services/notification.service';

type Product = {
  name: string;
  price: number;
}

@Component({
  selector: 'app-create-products',
  templateUrl: './create-products.component.html',
  styleUrl: './create-products.component.css'
})
export class CreateProductsComponent implements OnInit {
  
  declare createProductsForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private productsSVC: ProductsService,
    private notificationSVC: NotificationService,
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.createProductsForm = this.fb.group({
      name: [ '', [ Validators.required ]],
      price: [ '', [ Validators.required, Validators.pattern(/^[1-9]\d*(\.\d+)?$/) ]],
    });
  }

  submit() {
    const payload: Product = this.createProductsForm.value;
    this.productsSVC.create(payload).subscribe( response => {
      if(response) {
        const msg = `Product with id ${response.id} has been created successfully!`;
        const title = 'Product Created!';
        this.notificationSVC.success(msg, title);
      }
      this.createProductsForm.reset();
    });
  }
}
