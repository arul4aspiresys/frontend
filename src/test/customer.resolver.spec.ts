import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot, convertToParamMap } from '@angular/router';

import { customerResolver } from '../app/services/customer.resolver';
import { EnvironmentInjector, runInInjectionContext } from '@angular/core';
import { of } from 'rxjs';
import { CustomerDetail } from '../app/models/customers.interface';
import { CustomersService } from '../app/services/customers.service';
import { cold } from 'jasmine-marbles';

const mockRoute = { paramMap: 
  convertToParamMap({id: '1'})
} as unknown as ActivatedRouteSnapshot;
const mockCustomer: CustomerDetail = {
  id: 1,
  name: 'Test',
  mobile: 1234567890,
  orders: [
    {
      id: 1,
      totalAmount: 123.33,
      paymentMethod: 'Cash',
      customerID: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: new Date()
    }
  ],
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: new Date(),
};

describe('customerResolver', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: CustomersService,
          useValue: {
            getById: (id: number) => of(mockCustomer)
          }
        }
      ]
    });
  });

  it('should return the requested customer', () => {
    const result = runInInjectionContext(
      TestBed.inject(EnvironmentInjector),
      () => customerResolver(mockRoute, {} as RouterStateSnapshot)
    );
    expect(result).toBeObservable(cold('(a|)', { a: mockCustomer }));
  });
  
});
