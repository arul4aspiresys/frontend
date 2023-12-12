import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { CustomerInput, CustomerOutput } from '../models/customers.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  private baseUrL = environment.apiHost + environment.baseURL + '/customers';

  constructor(
    private http: HttpClient,
  ) { }

  create(payload: CustomerInput): Observable<CustomerOutput> {
    return this.http.post<CustomerOutput>(this.baseUrL, payload);
  }

  getAll(): Observable<CustomerOutput[]> {
    return this.http.get<CustomerOutput[]>(this.baseUrL);
  }

  getById(id: number): Observable<CustomerOutput> {
    return this.http.get<CustomerOutput>(this.baseUrL + `/${id}`);
  }

  deleteById(id: number): Observable<boolean> {
    return this.http.delete<boolean>(this.baseUrL + `/${id}`);
  }
}
