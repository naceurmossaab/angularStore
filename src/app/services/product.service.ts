import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiURL = 'http://localhost:3000/products';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<any> {
    return this.http.get(this.apiURL + '?_sort=-id');
  }

  addProduct(product: IProduct): Observable<any> {
    return this.http.post(this.apiURL, product);
  }
}
