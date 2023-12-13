import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ProductsService } from '../app/services/products.service';
import { ProductOutput } from '../app/models/products.interface';
import { baseURLProductsStub, createProductPayloadStub, getProductIDStub, productStub1, productListStub } from './spec-helper/product.service.spec-helper';

describe('ProductsService', () => {
  let service: ProductsService;
  let contoller: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        ProductsService
      ]
    });
    service = TestBed.inject(ProductsService);
    contoller = TestBed.inject(HttpTestingController);
  });

  it('creates a service', () => {
    expect(service).toBeTruthy();
  });

  it('creates product', () => {
    let apiResponse: ProductOutput | undefined;

    service.create(createProductPayloadStub).subscribe( res => apiResponse = res );
    
    const req = contoller.expectOne(baseURLProductsStub);
    req.flush(productStub1);

    expect(apiResponse).toBeTruthy();
    expect(apiResponse).toEqual(productStub1);
    expect(req.request.method).toEqual("POST");
  });

  it('retrives product list', () => {
    let apiResponse: ProductOutput[] | undefined;

    service.getAll().subscribe( response => apiResponse = response );

    const req = contoller.expectOne(baseURLProductsStub);
    req.flush(productListStub);

    expect(apiResponse).toBeTruthy();
    expect(apiResponse).toEqual(productListStub);
    expect(req.request.method).toEqual("GET");
  });

  it('retrives a specific product', () => {
    let apiResponse: ProductOutput | undefined;

    service.getById(getProductIDStub).subscribe( res => apiResponse = res );

    const req = contoller.expectOne(baseURLProductsStub + `/${getProductIDStub}`);
    req.flush(productStub1);

    expect(apiResponse).toBeTruthy();
    expect(apiResponse).toEqual(productStub1);
    expect(req.request.method).toEqual("GET");
  })
});
