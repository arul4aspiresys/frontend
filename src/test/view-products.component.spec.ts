import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewProductsComponent } from '../app/products/view-products/view-products.component';
import { ProductsModule } from '../app/products/products.module';
import { DebugElement } from '@angular/core';
import { ProductsService } from '../app/services/products.service';
import { of } from 'rxjs';
import { productListStub } from './spec-helper/product.service.spec-helper';
import { By } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';


describe('ViewProductsComponent', () => {
  let component: ViewProductsComponent;
  let fixture: ComponentFixture<ViewProductsComponent>;
  let el: DebugElement;
  let productsSVC: jasmine.SpyObj<ProductsService>;

  const columnClasses = {
    headerClass: ".mat-mdc-header-cell",
    cellClass: ".mat-mdc-cell",
    idClass: ".mat-column-id",
    nameClass: ".mat-column-name",
    priceClass: ".mat-column-price",
    createdDateClass: ".mat-column-createdAt",
  };

  beforeEach(async () => {
    const spySVC = jasmine.createSpyObj('ProductsService', ['getAll']);

    await TestBed.configureTestingModule({
      imports: [ProductsModule],
      providers: [
        {
          provide: ProductsService,
          useValue: spySVC,
        }
      ]
    })
    .compileComponents();

    productsSVC = TestBed.inject(ProductsService) as jasmine.SpyObj<ProductsService>;
    productsSVC.getAll.and.returnValue(of(productListStub));
    
    fixture = TestBed.createComponent(ViewProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    el = fixture.debugElement;
  });

  /* it('should create', () => {
    expect(component).toBeTruthy();
  }); */

  it('fetches the data from service upon component initialization', () => {
    component.ngOnInit();
    expect(component.dataSource.data).toEqual(productListStub);
  });

  it('displays the list of products in UI', () => {
    // card title
    expect(getElement(el, "mat-card-title").nativeElement.innerHTML).toContain("Product List");
    // table header
    expect(getElement(el, columnClasses.headerClass + columnClasses.idClass).nativeElement.innerHTML).toEqual("ID");
    expect(getElement(el, columnClasses.headerClass + columnClasses.nameClass).nativeElement.innerHTML).toEqual("Name");
    expect(getElement(el, columnClasses.headerClass + columnClasses.priceClass).nativeElement.innerHTML).toEqual("Price");
    expect(getElement(el, columnClasses.headerClass + columnClasses.createdDateClass).nativeElement.innerHTML).toEqual("Created Date");

    // row count
    const matRowList = getAllElement(el, "mat-row");
    expect(matRowList.length).toEqual(2);

    // table cell row 1
    expect(getElement(matRowList[0], columnClasses.cellClass + columnClasses.idClass).nativeElement.innerHTML).toContain(productListStub[0].id);
    expect(getElement(matRowList[0], columnClasses.cellClass + columnClasses.nameClass).nativeElement.innerHTML).toContain(productListStub[0].name);
    expect(getElement(matRowList[0], columnClasses.cellClass + columnClasses.priceClass).nativeElement.innerHTML).toContain(productListStub[0].price);
    expect(getElement(matRowList[0], columnClasses.cellClass + columnClasses.createdDateClass).nativeElement.innerHTML).toEqual(new DatePipe('en').transform(productListStub[0].createdAt, 'dd-MMM-yyyy'));

    // table cell row 2
    expect(getElement(matRowList[1], columnClasses.cellClass + columnClasses.idClass).nativeElement.innerHTML).toContain(productListStub[1].id);
    expect(getElement(matRowList[1], columnClasses.cellClass + columnClasses.nameClass).nativeElement.innerHTML).toContain(productListStub[1].name);
    expect(getElement(matRowList[1], columnClasses.cellClass + columnClasses.priceClass).nativeElement.innerHTML).toContain(productListStub[1].price);
    expect(getElement(matRowList[1], columnClasses.cellClass + columnClasses.createdDateClass).nativeElement.innerHTML).toEqual(new DatePipe('en').transform(productListStub[1].createdAt, 'dd-MMM-yyyy'));
  });
});

function getElement(el: DebugElement, selector: string): DebugElement {
  return el.query(By.css(selector));
}

function getAllElement(el: DebugElement, selector: string): DebugElement[] {
  return el.queryAll(By.css(selector));
}