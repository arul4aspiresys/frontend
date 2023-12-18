import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { NotificationService } from '../app/services/notification.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { CreateCustomersComponent } from '../app/customers/create-customers/create-customers.component';
import { CustomersService } from '../app/services/customers.service';
import { CustomersModule } from '../app/customers/customers.module';
import { createCustomerPayloadStub, createCustomersResponseStub } from './spec-helper/customer.service.spec-helper';



describe('CreateProductsComponent', () => {
  let component: CreateCustomersComponent;
  let fixture: ComponentFixture<CreateCustomersComponent>;
  let el: DebugElement;
  let customersSVC: jasmine.SpyObj<CustomersService>;
  let notificationSVC: jasmine.SpyObj<NotificationService>;

  beforeEach(async () => {
    const spyCustomersSVC = jasmine.createSpyObj('CustomersService', ['create']);
    const spyNotificationSVC = jasmine.createSpyObj('NotificationService', ['success']);

    await TestBed.configureTestingModule({
      imports: [
        CustomersModule,
        NoopAnimationsModule,
      ],
      providers: [
        {
          provide: CustomersService,
          useValue: spyCustomersSVC,
        },
        {
          provide: NotificationService,
          useValue: spyNotificationSVC,
        }
      ]
    })
    .compileComponents();

    customersSVC = TestBed.inject(CustomersService) as jasmine.SpyObj<CustomersService>;
    customersSVC.create.and.returnValue(of(createCustomersResponseStub));
    notificationSVC = TestBed.inject(NotificationService) as jasmine.SpyObj<NotificationService>;
    
    fixture = TestBed.createComponent(CreateCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    el = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initializes the form', () => {
    component.ngOnInit();
    fixture.detectChanges();
    expect(getAllElement(el, "input").length).toEqual(2);
    expect(component.createCustomerForm.get('name')?.errors).not.toBeNull();
    expect(component.createCustomerForm.get('mobile')?.errors).not.toBeNull();
    expect(getElement(el, "button.mat-primary").properties['disabled']).toEqual(true);
    expect(component.createCustomerForm.value).toEqual({ name: '', mobile: '' });
  });

  it('should enables the create button on valid input', () => {
    const validData = { name: 'A', mobile: 1234567890 };
    component.createCustomerForm.setValue(validData);
    fixture.detectChanges();
    expect(component.createCustomerForm.valid).toBeTruthy();
    expect(getElement(el, "button.mat-primary").properties['disabled']).toEqual(false);
  });

  it('should disables the create button on invalid input', () => {
    const invalidData = { name: '', mobile: 12333 };
    component.createCustomerForm.setValue(invalidData);
    fixture.detectChanges();
    expect(component.createCustomerForm.invalid).toBeTruthy();
    expect(getElement(el, "button.mat-primary").properties['disabled']).toEqual(true);
  });

  it('should create a product on valid data submission', fakeAsync(() => {
    component.createCustomerForm.setValue(createCustomerPayloadStub);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.createCustomerForm.valid).toBeTruthy();
      component.submit();
      tick(2000);
      fixture.detectChanges();
      expect(customersSVC.create).toHaveBeenCalledOnceWith(createCustomerPayloadStub);
      const msg = `Customer with id ${createCustomersResponseStub.id} has been created successfully!`;
      const title = 'Customer Created!';
      expect(notificationSVC.success).toHaveBeenCalledOnceWith(msg, title);
    });

  }));
});

const getElement = (el: DebugElement, selector: string) => {
  return el.query(By.css(selector));
}

const getAllElement = (el: DebugElement, selector: string) => {
  return el.queryAll(By.css(selector));
}
