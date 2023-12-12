import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { customerResolverResolver } from './customer.resolver';

describe('customerResolverResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => customerResolverResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
