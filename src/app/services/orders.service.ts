import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { OrderInput, OrderOutput } from '../models/orders.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private baseURL = environment.apiHost + environment.baseURL + '/orders';

  constructor(
    private http: HttpClient,
  ) { }

  create(payload: OrderInput): Observable<OrderOutput> {
    return this.http.post<OrderOutput>(this.baseURL, payload);
  }

  getById(id: number): Observable<OrderOutput> {
    return this.http.get<OrderOutput>(this.baseURL + `/${id}`);
  }
}
