import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { CustomerDetail, CustomerOutput } from '../models/customers.interface';
import { Observable } from 'rxjs';
import { CustomersService } from './customers.service';

export const customerResolver: ResolveFn<CustomerDetail> = ( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): Observable<CustomerDetail> => {
    const customerSVC = inject(CustomersService);
    return customerSVC.getById(Number(route.paramMap.get('id')))
};
