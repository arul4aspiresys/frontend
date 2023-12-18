import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot, convertToParamMap } from '@angular/router';
import { EnvironmentInjector, runInInjectionContext } from '@angular/core';
import { of } from 'rxjs';
import { cold } from 'jasmine-marbles';
import { OrderOutput } from '../app/models/orders.interface';
import { OrdersService } from '../app/services/orders.service';
import { orderResolver } from '../app/services/order.resolver';

const mockRoute = { paramMap: 
  convertToParamMap({id: '1'})
} as unknown as ActivatedRouteSnapshot;
const mockOrder: OrderOutput = {
  id: 1,
  customerID: 1,
  paymentMethod: 'UPI',
  totalAmount: 1299,
  orderDetails: [
    {
      orderID: 1,
      productID: 1,
      quantity: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: new Date(),
    }
  ],
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: new Date(),
};

describe('orderResolver', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: OrdersService,
          useValue: {
            getById: (id: number) => of(mockOrder)
          }
        }
      ]
    });
  });

  it('should return the requested customer', () => {
    const result = runInInjectionContext(
      TestBed.inject(EnvironmentInjector),
      () => orderResolver(mockRoute, {} as RouterStateSnapshot)
    );
    expect(result).toBeObservable(cold('(a|)', { a: mockOrder }));
  });
  
});
