import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CreateOrdersComponent } from '../app/orders/create-orders/create-orders.component';
import { DebugElement } from '@angular/core';
import { OrdersModule } from '../app/orders/orders.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CustomersService } from '../app/services/customers.service';
import { ProductsService } from '../app/services/products.service';
import { NotificationService } from '../app/services/notification.service';
import { customerListStub } from './spec-helper/customer.service.spec-helper';
import { of } from 'rxjs';
import { productListStub } from './spec-helper/product.service.spec-helper';
import { OrdersService } from '../app/services/orders.service';
import { createOrderPayloadStub, createOrdersResponseStub } from './spec-helper/order.sservice.spec-helper';
import { By } from '@angular/platform-browser';


describe('CreateOrdersComponent', () => {
  let component: CreateOrdersComponent;
  let fixture: ComponentFixture<CreateOrdersComponent>;
  let el: DebugElement;
  let customersSVC: jasmine.SpyObj<CustomersService>;
  let productsSVC: jasmine.SpyObj<ProductsService>;
  let ordersSVC: jasmine.SpyObj<OrdersService>;
  let notificationSVC: jasmine.SpyObj<NotificationService>;

  beforeEach(async () => {
    const spyCustomersSVC = jasmine.createSpyObj('CustomersService', ['getAll']);
    const spyProductsSVC = jasmine.createSpyObj('ProductsService', ['getAll']);
    const spyNotificationSVC = jasmine.createSpyObj('NotificationsService', ['success']);
    const spyOrdersSVC = jasmine.createSpyObj('OrdersService', ['create']);

    await TestBed.configureTestingModule({
      imports: [
        OrdersModule,
        NoopAnimationsModule,
      ],
      providers: [
        {
          provide: CustomersService,
          useValue: spyCustomersSVC,
        },
        {
          provide: ProductsService,
          useValue: spyProductsSVC,
        },
        {
          provide: NotificationService,
          useValue: spyNotificationSVC,
        },
        {
          provide: OrdersService,
          useValue: spyOrdersSVC,
        }
      ]
    })
    .compileComponents();

    customersSVC = TestBed.inject(CustomersService) as jasmine.SpyObj<CustomersService>;
    productsSVC = TestBed.inject(ProductsService) as jasmine.SpyObj<ProductsService>;
    notificationSVC = TestBed.inject(NotificationService) as jasmine.SpyObj<NotificationService>;
    ordersSVC = TestBed.inject(OrdersService) as jasmine.SpyObj<OrdersService>;

    customersSVC.getAll.and.returnValue(of(customerListStub));
    productsSVC.getAll.and.returnValue(of(productListStub));
    ordersSVC.create.and.returnValue(of(createOrdersResponseStub));
    
    fixture = TestBed.createComponent(CreateOrdersComponent);
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

    expect(getAllElement(el, "mat-select").length).toEqual(3);
    expect(component.createOrderForm.get('customerID')?.errors).not.toBeNull();
    expect(component.createOrderForm.get('totalAmount')?.errors).not.toBeNull();
    expect(component.createOrderForm.get('paymentMethod')?.errors).not.toBeNull();
    expect(component.orderDetails.get('quantity')?.errors).not.toBeNull();
    expect(component.orderDetails.get('productID')?.errors).not.toBeNull();
    expect(getElement(el, "button.mat-primary").properties['disabled']).toEqual(true);
    expect(component.createOrderForm.value).toEqual({
      customerID: '',
      totalAmount: '',
      paymentMethod: '',
      orderDetails: [
        {
          productID: '',
          quantity: ''
        }
      ]
    });
  });

  it('should enables the create button on valid input', () => {
    component.createOrderForm.setValue(createOrderPayloadStub);
    fixture.detectChanges();
    expect(component.createOrderForm.valid).toBeTruthy();
    expect(getElement(el, "button.mat-primary").properties['disabled']).toEqual(false);
  });

  it('should disables the create button on invalid input', () => {
    const invalidData = { ...createOrderPayloadStub, customerID: '' };
    component.createOrderForm.setValue(invalidData);
    fixture.detectChanges();
    expect(component.createOrderForm.invalid).toBeTruthy();
    expect(getElement(el, "button.mat-primary").properties['disabled']).toEqual(true);
  });

  it('should create order on submission of valid data', fakeAsync(
    () => {     
      component.createOrderForm.setValue(createOrderPayloadStub);
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(component.createOrderForm.valid).toBeTruthy();
        component.submit();
        tick(2000);
        fixture.detectChanges();
        expect(ordersSVC.create).toHaveBeenCalledOnceWith({
          customerID: 1,
          paymentMethod: 'Cash',
          totalAmount: 100,
          orderDetails: [
            {
              productID: 1,
              quantity: 1
            }
          ]
        });
        const msg = `Order with id ${createOrdersResponseStub.id} has been created successfully!`;
        const title = 'Order Created!';
        expect(notificationSVC.success).toHaveBeenCalledOnceWith(msg, title);
      });
    }
  ));
});
const getElement = (el: DebugElement, selector: string) => {
  return el.query(By.css(selector));
}

const getAllElement = (el: DebugElement, selector: string) => {
  return el.queryAll(By.css(selector));
}
