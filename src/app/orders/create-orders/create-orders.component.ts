import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomersService } from '../../services/customers.service';
import { OrdersService } from '../../services/orders.service';
import { CustomerOutput } from '../../models/customers.interface';
import { ProductsService } from '../../services/products.service';
import { ProductOutput } from '../../models/products.interface';
import { Subscription } from 'rxjs';
import { NotificationService } from '../../services/notification.service';

type OrderDetail = {
  productID: number;
  quantity: number;
}

type Order = {
  customerID: number;
  totalAmount: number;
  paymentMethod: string;
  orderDetails: OrderDetail[];
}

@Component({
  selector: 'app-create-orders',
  templateUrl: './create-orders.component.html',
  styleUrl: './create-orders.component.css'
})
export class CreateOrdersComponent implements OnInit {

  declare createOrderForm: FormGroup;
  declare customers: CustomerOutput[];
  declare products: ProductOutput[];
  declare subs: Subscription;

  paymentMethods = [
    { name: 'Cash' },
    { name: 'UPI' },
    { name: 'Card' },
  ];

  constructor(
    private fb: FormBuilder,
    private customersSVC: CustomersService,
    private productsSVC: ProductsService,
    private ordersSVC: OrdersService,
    private notificationSVC: NotificationService,
  ){}

  ngOnInit(): void {
    this.customersSVC.getAll().subscribe( response => {
      if(response) {
        console.log('Customers = ', response);
        this.customers = response;
      }
    });
    this.productsSVC.getAll().subscribe( response => {
      if(response) {
        console.log('Products = ', response);
        this.products = response;
      }
    });
    this.initForm();
    this.addField();
  }

  initForm() {
    this.createOrderForm = this.fb.group({
      customerID: [ '', [ Validators.required ]],
      orderDetails: this.fb.array([]),
      totalAmount: ['', [ Validators.required ]],
      paymentMethod: ['', [ Validators.required ]],
    });
  }

  get orderDetails() {
    return this.createOrderForm.get('orderDetails') as FormArray;
  }

  addField() {
    const newField: FormGroup = this.fb.group({
      productID: [ '', [ Validators.required ]],
      quantity: [ '', [ Validators.required ]],
    });
    this.orderDetails.push(newField);
  }

  removeField(index: number) {
    this.orderDetails.removeAt(index);
    this.triggerEvent();
  }

   triggerEvent() {
    const selectedProducts: any[]  = this.createOrderForm.get('orderDetails')?.value;
    let total: number = selectedProducts.reduce((acc, el) => {
      const product = this.products.find(p => el.productID == p.id);
      if(product){
        return acc + (el.quantity * product.price);
      }
    }, 0 )
    this.createOrderForm.patchValue({
      totalAmount: Number(total),
    });
    this.createOrderForm.updateValueAndValidity();
  }

  submit() {
    const payload: Order = this.createOrderForm.value;
    this.ordersSVC.create(payload).subscribe( response => {
      if(response) {
        const msg = `Order with id ${response.id} has been created successfully!`;
        const title = 'Order Created!';
        this.notificationSVC.success(msg, title);
      }
      this.createOrderForm.reset();
    })
  }
}
