import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CustomerDetailComponent } from "../app/customers/customer-detail/customer-detail.component";
import { CustomersModule } from "../app/customers/customers.module";
import { ActivatedRoute, Router } from "@angular/router";
import { customerStub1, customerWithOutOrdersStub } from "./spec-helper/customer.service.spec-helper";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { orderStub1 } from "./spec-helper/order.sservice.spec-helper";

let component: CustomerDetailComponent;
let fixture: ComponentFixture<CustomerDetailComponent>;
let route: ActivatedRoute;
let router: Router;
let el: DebugElement;

describe('CustomerDetailComponent', () => {
    
    const columnClasses = {
        headerClass: ".mat-mdc-header-cell",
        cellClass: ".mat-mdc-cell",
        idClass: ".mat-column-id",
        totalAmountClass: ".mat-column-totalAmount",
        paymentMethodClass: ".mat-column-paymentMethod",
        createdDateClass: ".mat-column-createdAt",
        actionsClass: ".mat-column-actions",
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports:[
                CustomersModule,
            ],
        });
    });
    
    /* it('creates a component', () => {
        overrideWithStub();
        expect(component).toBeTruthy();
    }); */
    
    it('shows details of one customer detail', () => {
        overrideWithStub();
        
        const card = el.query(By.css("mat-card"));
        const customerName = el.query(By.css(".detail-header:first-child"));
        const customerMobile = el.query(By.css(".detail-header:nth-child(2)"));
        const matTable = el.query(By.css("mat-table"));
             
        const idHeader = el.query(By.css(columnClasses.headerClass + columnClasses.idClass));
        const idCell = el.query(By.css(columnClasses.cellClass + columnClasses.idClass));
        const totalAmountHeader = el.query(By.css(columnClasses.headerClass + columnClasses.totalAmountClass));
        const totalAmountCell = el.query(By.css(columnClasses.cellClass + columnClasses.totalAmountClass));
        const paymentMethodHeader = el.query(By.css(columnClasses.headerClass + columnClasses.paymentMethodClass));
        const paymentMethodCell = el.query(By.css(columnClasses.cellClass + columnClasses.paymentMethodClass));
        const actionsHeader = el.query(By.css(columnClasses.headerClass + columnClasses.actionsClass));
        const actionsCell = el.query(By.css(columnClasses.cellClass + columnClasses.actionsClass));

        expect(component.dataSource.data).toEqual(customerStub1.orders);
        expect(card).toBeTruthy();
        expect(customerName.nativeElement.innerHTML).toContain(customerStub1.name);
        expect(customerMobile.nativeElement.innerHTML).toContain(customerStub1.mobile);
        expect(matTable).toBeTruthy();
        expect(idHeader.nativeElement.innerHTML).toEqual("ID");
        expect(totalAmountHeader.nativeElement.innerHTML).toEqual("Amount");
        expect(paymentMethodHeader.nativeElement.innerHTML).toEqual("Payment Type");
        expect(actionsHeader.nativeElement.innerHTML).toEqual("Actions");
        expect(idCell.nativeElement.innerHTML).toContain(customerStub1.orders[0].id);
        expect(totalAmountCell.nativeElement.innerHTML).toContain(customerStub1.orders[0].totalAmount);
        expect(paymentMethodCell.nativeElement.innerHTML).toEqual(customerStub1.orders[0].paymentMethod);
        expect(actionsCell).toBeTruthy();
    });

    it('shows a "No order found" message if no orders available for the customer', () => {
        overrideWithStubEmpty();
        const elseBlock = el.query(By.css("mat-card-content .m-1rem")).nativeElement.innerHTML;
        expect(elseBlock).toEqual("No orders found");
    });

    it('navigates to order detail page upon clicking the launch button', () => {
        overrideWithStub();
        spyOn(router, 'navigateByUrl');
        const launchButton = el.query(By.css(columnClasses.cellClass + columnClasses.actionsClass + ' .mdc-icon-button'));
        launchButton.triggerEventHandler('click', null);
        expect(router.navigateByUrl).toHaveBeenCalledWith("/orders/1");
    });

    it('fetches data from services when the component is initialized', () => {
        overrideWithStub();
        component.ngOnInit();
        expect(component.customerData).toEqual(customerStub1);
        expect(component.dataSource.data).toEqual(customerStub1.orders);
    });

    it('navigates to specific order on calling view()', () => {
        spyOn(router, 'navigateByUrl');
        component.view(customerStub1.orders[0].id);
        expect(router.navigateByUrl).toHaveBeenCalledWith("/orders/1");
    });
});

function overrideWithStub() {
    TestBed.overrideProvider(ActivatedRoute, {
        useValue: {
            snapshot: {
                data: {
                    customer: customerStub1
                }
            }
        }
    }).compileComponents();
    fixture = TestBed.createComponent(CustomerDetailComponent);
    el = fixture.debugElement;
    route = TestBed.inject(ActivatedRoute);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
    component.customerData = route.snapshot.data['customer'];
    fixture.detectChanges();
}

function overrideWithStubEmpty() {
    TestBed.overrideProvider(ActivatedRoute, {
        useValue: {
            snapshot: {
                data: {
                    customer: customerWithOutOrdersStub
                }
            }
        }
    }).compileComponents();
    fixture = TestBed.createComponent(CustomerDetailComponent);
    el = fixture.debugElement;
    route = TestBed.inject(ActivatedRoute);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
    component.customerData = route.snapshot.data['customer'];
    fixture.detectChanges();
}