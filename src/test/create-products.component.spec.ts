import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CreateProductsComponent } from '../app/products/create-products/create-products.component';
import { DebugElement } from '@angular/core';
import { ProductsService } from '../app/services/products.service';
import { NotificationService } from '../app/services/notification.service';
import { ProductsModule } from '../app/products/products.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { createProductPayloadStub, createProductResponseStub } from './spec-helper/product.service.spec-helper';



describe('CreateProductsComponent', () => {
  let component: CreateProductsComponent;
  let fixture: ComponentFixture<CreateProductsComponent>;
  let el: DebugElement;
  let productsSVC: jasmine.SpyObj<ProductsService>;
  let notificationSVC: jasmine.SpyObj<NotificationService>;

  beforeEach(async () => {
    const spyProductsSVC = jasmine.createSpyObj('ProductsService', ['create']);
    const spyNotificationSVC = jasmine.createSpyObj('NotificationService', ['success']);

    await TestBed.configureTestingModule({
      imports: [
        ProductsModule,
        NoopAnimationsModule,
      ],
      providers: [
        {
          provide: ProductsService,
          useValue: spyProductsSVC,
        },
        {
          provide: NotificationService,
          useValue: spyNotificationSVC,
        }
      ]
    })
    .compileComponents();

    productsSVC = TestBed.inject(ProductsService) as jasmine.SpyObj<ProductsService>;
    notificationSVC = TestBed.inject(NotificationService) as jasmine.SpyObj<NotificationService>;
    productsSVC.create.and.returnValue(of(createProductResponseStub));
    
    fixture = TestBed.createComponent(CreateProductsComponent);
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
    expect(component.createProductsForm.get('name')?.errors).not.toBeNull();
    expect(component.createProductsForm.get('price')?.errors).not.toBeNull();
    expect(getElement(el, "button.mat-primary").properties['disabled']).toEqual(true);
    expect(component.createProductsForm.value).toEqual({ name: '', price: '' });
  });

  it('should enables the create button on valid input', () => {
    const validData = { name: 'A', price: 123.33 };
    component.createProductsForm.setValue(validData);
    fixture.detectChanges();
    expect(component.createProductsForm.valid).toBeTruthy();
    expect(getElement(el, "button.mat-primary").properties['disabled']).toEqual(false);
  });

  it('should disables the create button on invalid input', () => {
    const invalidData = { name: '', price: 123.33 };
    component.createProductsForm.setValue(invalidData);
    fixture.detectChanges();
    expect(component.createProductsForm.invalid).toBeTruthy();
    expect(getElement(el, "button.mat-primary").properties['disabled']).toEqual(true);
  });

  it('should create a product on valid data submission', fakeAsync(() => {
    component.createProductsForm.setValue(createProductPayloadStub);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.createProductsForm.valid).toBeTruthy();
      component.submit();
      tick(2000);
      fixture.detectChanges();
      expect(productsSVC.create).toHaveBeenCalledOnceWith(createProductPayloadStub);
      const msg = `Product with id ${createProductResponseStub.id} has been created successfully!`;
      const title = 'Product Created!';
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
