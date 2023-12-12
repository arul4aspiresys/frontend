import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, Router, RouterStateSnapshot } from '@angular/router';
import { CustomerOutput } from '../models/customers.interface';
import { Observable } from 'rxjs';
import { CustomersService } from './customers.service';

export const customerResolver: ResolveFn<CustomerOutput> = ( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): Observable<CustomerOutput> => {
    const customerSVC = inject(CustomersService);
    return customerSVC.getById(Number(route.paramMap.get('id')))
};
