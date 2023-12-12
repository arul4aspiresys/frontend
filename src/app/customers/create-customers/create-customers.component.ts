import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomersService } from '../../services/customers.service';
import { NotificationService } from '../../services/notification.service';

type Customer = {
  name: string;
  mobile: number;
}

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customers.component.html',
  styleUrl: './create-customers.component.css'
})
export class CreateCustomersComponent implements OnInit{

  declare createCustomerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private customerSVC: CustomersService,
    private notificationSVC: NotificationService,
  ){}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.createCustomerForm = this.fb.group({
      name: ['', [ Validators.required ]],
      mobile: ['', [ Validators.required, Validators.pattern(/^\d{10}$/)]],
    });
  }

  submit() {
    console.log(this.createCustomerForm.value);
    const payload: Customer = this.createCustomerForm.value;
    this.customerSVC.create(payload).subscribe( response => {
      if(response) {
        const msg = `Customer with id ${response.id} has been created successfully!`;
        const title = 'Customer Created!';
        this.notificationSVC.success(msg, title);
      }
      this.createCustomerForm.reset();
    });
  }

}
