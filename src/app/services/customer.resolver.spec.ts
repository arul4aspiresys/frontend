import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';

import * as ResolverUnderTest from './customer.resolver';
import { Injectable } from '@angular/core';
import { CustomerDetail } from '../models/customers.interface';
import { CustomersService } from './customers.service';
import { of } from 'rxjs';
import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';

const mockRoute = { params: { id: 1 }} as unknown as ActivatedRouteSnapshot;
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
  let service: ResolverTestService;

  TestBed.configureTestingModule({
    providers: [
      ResolverTestService,
      {
        provide: CustomersService,
        useValue: {
          getById: () => of(mockCustomer)
        }
      }
    ]
  });

  service = TestBed.inject(ResolverTestService);

  it('should return the requested customer', () => {
    expect(service.resolverUnderTest).toBe(mockCustomer);
  });
  
});

@Injectable() 
class ResolverTestService {
  constructor() {}
  resolverUnderTest = ResolverUnderTest.customerResolver(mockRoute, {} as RouterStateSnapshot);
}
