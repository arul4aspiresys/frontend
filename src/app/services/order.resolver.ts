import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { OrderOutput } from '../models/orders.interface';
import { OrdersService } from './orders.service';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';

export const orderResolver: ResolveFn<OrderOutput> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<OrderOutput> => {
  const orderSVC = inject(OrdersService);
  return orderSVC.getById(Number(route.paramMap.get('id')));
};
