import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { CustomersModule } from '../app/customers/customers.module';
import { ViewCustomersComponent } from '../app/customers/view-customers/view-customers.component';
import { CustomersService } from '../app/services/customers.service';
import { of } from 'rxjs';
import { customerListStub } from './spec-helper/customer.service.spec-helper';
import { By } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';

describe('ViewCustomersComponent', () => {
  
  let component: ViewCustomersComponent;
  let fixture: ComponentFixture<ViewCustomersComponent>;
  let el: DebugElement;
  let router: Router;
  let customersSVC: jasmine.SpyObj<CustomersService>;

  const columnClasses = {
    headerClass: ".mat-mdc-header-cell",
    cellClass: ".mat-mdc-cell",
    idClass: ".mat-column-id",
    nameClass: ".mat-column-name",
    mobileClass: ".mat-column-mobile",
    createdDateClass: ".mat-column-createdAt",
    actionsClass: ".mat-column-actions",
    iconClass: ".mdc-icon-button",
  };

  beforeEach(async () => {
    const customersSpySVC = jasmine.createSpyObj('CustomersService', ['getAll']);

    await TestBed.configureTestingModule({
      imports: [
        CustomersModule
      ],
      providers: [
        {
          provide: CustomersService,
          useValue: customersSpySVC
        }
      ]
    })
    .compileComponents();
    
    router = TestBed.inject(Router);
    customersSVC = TestBed.inject(CustomersService) as jasmine.SpyObj<CustomersService>;
    customersSVC.getAll.and.returnValue(of(customerListStub));

    fixture = TestBed.createComponent(ViewCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    el = fixture.debugElement;
  });

  /* it('creates a component', () => {
    expect(component).toBeTruthy();
  }); */

  it('displays the customers list', () => {
    // Card title
    expect(getElement(el, "mat-card-title").nativeElement.innerHTML).toEqual("Customer List");

    // table header
    expect(getElement(el, columnClasses.headerClass + columnClasses.idClass).nativeElement.innerHTML).toEqual("ID");
    expect(getElement(el, columnClasses.headerClass + columnClasses.nameClass).nativeElement.innerHTML).toEqual("Name");
    expect(getElement(el, columnClasses.headerClass + columnClasses.mobileClass).nativeElement.innerHTML).toEqual("Mobile");
    expect(getElement(el, columnClasses.headerClass + columnClasses.createdDateClass).nativeElement.innerHTML).toEqual("Created Date");
    expect(getElement(el, columnClasses.headerClass + columnClasses.actionsClass).nativeElement.innerHTML).toEqual("Actions");

    // row count
    const matRowList = getAllElement(el, "mat-row");
    expect(matRowList.length).toEqual(2);

    // table cell row 1
    expect(getElement(matRowList[0], columnClasses.cellClass + columnClasses.idClass).nativeElement.innerHTML).toContain(customerListStub[0].id);
    expect(getElement(matRowList[0], columnClasses.cellClass + columnClasses.nameClass).nativeElement.innerHTML).toContain(customerListStub[0].name);
    expect(getElement(matRowList[0], columnClasses.cellClass + columnClasses.mobileClass).nativeElement.innerHTML).toContain(customerListStub[0].mobile);
    expect(getElement(matRowList[0], columnClasses.cellClass + columnClasses.createdDateClass).nativeElement.innerHTML).toEqual(new DatePipe('en').transform(customerListStub[0].createdAt, 'dd-MMM-yyyy'));

    // table cell row 2
    expect(getElement(matRowList[1], columnClasses.cellClass + columnClasses.idClass).nativeElement.innerHTML).toContain(customerListStub[1].id);
    expect(getElement(matRowList[1], columnClasses.cellClass + columnClasses.nameClass).nativeElement.innerHTML).toContain(customerListStub[1].name);
    expect(getElement(matRowList[1], columnClasses.cellClass + columnClasses.mobileClass).nativeElement.innerHTML).toContain(customerListStub[1].mobile);
    expect(getElement(matRowList[1], columnClasses.cellClass + columnClasses.createdDateClass).nativeElement.innerHTML).toEqual(new DatePipe('en').transform(customerListStub[1].createdAt, 'dd-MMM-yyyy'));
  });

  it('navigates to specific customer details on click of launch button', () => {
    spyOn(router, 'navigateByUrl');

    const matRowList = getAllElement(el, "mat-row");

    // row 1 button click
    getElement(matRowList[0], columnClasses.cellClass + columnClasses.actionsClass + " " + columnClasses.iconClass).triggerEventHandler('click', null);
    expect(router.navigateByUrl).toHaveBeenCalledWith('/customers/1');

    // row 2 button click
    getElement(matRowList[1], columnClasses.cellClass + columnClasses.actionsClass + " " + columnClasses.iconClass).triggerEventHandler('click', null);
    expect(router.navigateByUrl).toHaveBeenCalledWith('/customers/2');
  });

  it('fetch customers on component initialization', () => {
    component.ngOnInit();
    expect(component.dataSource.data).toEqual(customerListStub);
  });

  it('navigates to the specific customer details on view()', () => {
    spyOn(router, 'navigateByUrl');
    component.view(customerListStub[0].id);
    expect(router.navigateByUrl).toHaveBeenCalledWith('/customers/1');
  });
});

function getElement(el: DebugElement, selector: string): DebugElement {
  return el.query(By.css(selector));
}

function getAllElement(el: DebugElement, selector: string): DebugElement[] {
  return el.queryAll(By.css(selector));
}