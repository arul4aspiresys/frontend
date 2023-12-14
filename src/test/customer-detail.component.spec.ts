import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CustomerDetailComponent } from "../app/customers/customer-detail/customer-detail.component";
import { CustomersModule } from "../app/customers/customers.module";
import { ActivatedRoute, Router } from "@angular/router";
import { customerStub1, customerWithOutOrdersStub } from "./spec-helper/customer.service.spec-helper";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

describe('CustomerDetailComponent', () => {
    let component: CustomerDetailComponent;
    let fixture: ComponentFixture<CustomerDetailComponent>;
    let route: ActivatedRoute;
    let router: Router;
    let el: DebugElement;
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
    
    it('creates a component', () => {
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
        expect(component).toBeTruthy();
    });
    
    it('shows details of one customer detail', () => {
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
        expect(idCell.nativeElement.innerHTML).toEqual("1");
        expect(totalAmountCell.nativeElement.innerHTML).toEqual("100.88");
        expect(paymentMethodCell.nativeElement.innerHTML).toEqual("UPI");
        expect(actionsCell).toBeTruthy();
    });

    it('shows a "No order found" message if no orders available for the customer', () => {
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

        const elseBlock = el.query(By.css("mat-card-content .m-1rem")).nativeElement.innerHTML;
        expect(elseBlock).toEqual("No orders found");
    });

    it('navigates to order detail page upon clicking the launch button', () => {
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

        spyOn(router, 'navigateByUrl');

        const launchButton = el.query(By.css(columnClasses.cellClass + columnClasses.actionsClass + ' .mdc-icon-button'));
        console.log(launchButton.nativeElement);
        launchButton.triggerEventHandler('click', null);

        expect(router.navigateByUrl).toHaveBeenCalledWith("/orders/1");
    });
});