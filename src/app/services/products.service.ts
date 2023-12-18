import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ProductInput, ProductOutput } from '../models/products.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private baseURL = environment.apiHost + environment.baseURL + '/products';

  constructor(
    private http: HttpClient,
  ) { }

  create(payload: ProductInput): Observable<ProductOutput> {
    return this.http.post<ProductOutput>(this.baseURL, payload);
  }

  getAll(): Observable<ProductOutput[]> {
    return this.http.get<ProductOutput[]>(this.baseURL);
  }

  getById(id: number): Observable<ProductOutput> {
    return this.http.get<ProductOutput>(this.baseURL + `/${id}`);
  }

  /* deleteById(id: number): Observable<boolean> {
    return this.http.delete<boolean>(this.baseURL + `/${id}`);
  } */
}
