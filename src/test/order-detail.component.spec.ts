import { DatePipe } from "@angular/common";
import { By } from "@angular/platform-browser";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { OrderDetailComponent } from "../app/orders/order-detail/order-detail.component";
import { DebugElement } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { of } from "rxjs";
import { ProductsService } from "../app/services/products.service";
import { CustomersService } from "../app/services/customers.service";
import { orderStub1 } from "./spec-helper/order.sservice.spec-helper";
import { OrdersModule } from "../app/orders/orders.module";
import { customerListStub } from "./spec-helper/customer.service.spec-helper";
import { productListStub } from "./spec-helper/product.service.spec-helper";

describe('OrdeDetailComponent', () => {
    let component: OrderDetailComponent;
    let fixture: ComponentFixture<OrderDetailComponent>;
    let el: DebugElement;
    let route: ActivatedRoute;
    let customersSVC: any;
    let productsSVC: any;

    const columnClasses = {
        headerClass: '.mat-mdc-header-cell',
        cellClass: '.mat-mdc-cell',
        productIDClass: ".mat-column-productID",
        quantityClass: ".mat-column-quantity",
        createdDateClass: ".mat-column-createdAt",
    };

    beforeEach(async () => {
        const fakeCustomerSVC = jasmine.createSpyObj('CustomersService', ['getAll']);
        const fakeProductsSVC = jasmine.createSpyObj('ProductsService', ['getAll']);

         await TestBed.configureTestingModule({
            imports: [
                OrdersModule
            ],
            providers: [
                {
                    provide: ProductsService,
                    useValue: fakeProductsSVC,
                },
                {
                    provide: CustomersService,
                    useValue: fakeCustomerSVC,
                },
                {
                    provide: ActivatedRoute,
                    useValue: {
                        snapshot: {
                            data: {
                                order: orderStub1
                            }
                        }
                    }
                }
            ]
        }).compileComponents();

        route = TestBed.inject(ActivatedRoute);
        productsSVC = TestBed.inject(ProductsService);
        customersSVC = TestBed.inject(CustomersService);

        customersSVC.getAll.and.returnValue(of(customerListStub));
        productsSVC.getAll.and.returnValue(of(productListStub));
        
        fixture = TestBed.createComponent(OrderDetailComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;

        component.orderData = route.snapshot.data['order'];
        fixture.detectChanges();
    });

    /* it('creates a component', () => {
        expect(component).toBeTruthy();
    }); */

    it('shows details of one order', () => {  
        // mat-card
        expect(el.query(By.css("mat-card"))).toBeTruthy();

        // Order Data
        expect(el.query(By.css(".detail-header:first-child")).nativeElement.innerHTML).toContain("C1"); // CustomerName
        expect(el.query(By.css(".detail-header:nth-child(2)")).nativeElement.innerHTML).toContain("1"); // OrderID
        expect(el.query(By.css(".detail-header:nth-child(3)")).nativeElement.innerHTML).toContain("123.78"); // TotalAmount
        expect(el.query(By.css(".detail-header:nth-child(4)")).nativeElement.innerHTML).toContain("Cash"); // PaymentMethod

        // table header
        expect(el.query(By.css(columnClasses.headerClass + columnClasses.productIDClass)).nativeElement.innerHTML).toEqual("Product");
        expect(el.query(By.css(columnClasses.headerClass + columnClasses.quantityClass)).nativeElement.innerHTML).toEqual("Quantity");
        expect(el.query(By.css(columnClasses.headerClass + columnClasses.createdDateClass)).nativeElement.innerHTML).toEqual("Created Date");
        
        // table data
        expect(el.query(By.css(columnClasses.cellClass + columnClasses.productIDClass)).nativeElement.innerHTML).toEqual("test")
        expect(el.query(By.css(columnClasses.cellClass + columnClasses.quantityClass)).nativeElement.innerHTML).toEqual("1");
        expect(el.query(By.css(columnClasses.cellClass + columnClasses.createdDateClass)).nativeElement.innerHTML).toEqual(new DatePipe('en').transform(orderStub1.orderDetails[0].createdAt, 'dd-MMM-yyyy'));
    });

    it('fetches data from services on component initialization', () => {
        component.ngOnInit();
        expect(component.products).toEqual(productListStub);
        expect(component.customers).toEqual(customerListStub);
        expect(component.orderData).toEqual(orderStub1);
        expect(component.dataSource.data).toEqual(orderStub1.orderDetails);
    });

    it('getProductName(id) - should returns the product name matches the id', () => {
        expect(component.getProductName(orderStub1.orderDetails[0].productID)).toEqual('test');
    });

    it('getCustomerName() - should returns the customer name matches the id', () => {
        expect(component.getCustomerName(orderStub1.customerID)).toEqual('C1');
    });
});