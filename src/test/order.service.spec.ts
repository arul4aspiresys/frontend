import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { OrdersService } from '../app/services/orders.service';
import { OrderOutput } from '../app/models/orders.interface';
import { baseURLOrdersStub, createOrderPayloadStub, getOrderIDStub, orderStub1, orderStub2 } from './spec-helper/order.sservice.spec-helper';
import { HttpErrorResponse } from '@angular/common/http';

describe('OrdersService', () => {
  let service: OrdersService;
  let controller: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        OrdersService
      ]
    });
    service = TestBed.inject(OrdersService);
    controller = TestBed.inject(HttpTestingController);
  });

  it('creates a service', () => {
    expect(service).toBeTruthy();
  });

  it('creates product', () => {
    let apiResponse: OrderOutput | undefined;

    service.create(createOrderPayloadStub).subscribe( res => apiResponse = res );
    
    const req = controller.expectOne(baseURLOrdersStub);
    req.flush(orderStub1);

    expect(apiResponse).toBeTruthy();
    expect(apiResponse).toEqual(orderStub1);
    expect(req.request.method).toEqual("POST");
  });

  it('retrives a specific product', () => {
    let apiResponse: OrderOutput | undefined;

    service.getById(getOrderIDStub).subscribe( res => apiResponse = res );

    const req = controller.expectOne(baseURLOrdersStub + `/${getOrderIDStub}`);
    req.flush(orderStub2);

    expect(apiResponse).toBeTruthy();
    expect(apiResponse).toEqual(orderStub2);
    expect(req.request.method).toEqual("GET");
  });
  
  it('passes through errors', () => {
    const status = 500;
    const statusText = 'Internal Server Error';
    const errorEvent = new ProgressEvent('API error');

    let actualError: HttpErrorResponse | undefined;

    service.create(createOrderPayloadStub).subscribe({
        next: () => {
            fail('next handler must not be called');
          },
        error: (error) => {
            actualError = error;
          },
        complete: () => {
            fail('complete handler must not be called');
          },
    });

    controller.expectOne(baseURLOrdersStub).error(errorEvent, { status, statusText });

    if (!actualError) {
      throw new Error('Error needs to be defined');
    }
    expect(actualError.error).toBe(errorEvent);
    expect(actualError.status).toBe(status);
    expect(actualError.statusText).toBe(statusText);
  });
});
