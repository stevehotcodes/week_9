import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  getAllProductDetails,
  productDetails,
} from '../interfaces/productInterface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  // getProductById(id: string) {
  //   throw new Error('Method not implemented.');
  // }
  private apiUrl = 'http://localhost:3000/products/new';

  constructor(private http: HttpClient) {}

  addProduct(product: productDetails): Observable<any> {
    return this.http.post<any>(this.apiUrl, product);
  }

  getAllProducts(): Observable<any> {
    return this.http.get<getAllProductDetails[]>(
      'http://localhost:3000/products/all'
    );
  }
  getProductByID(id: string): Observable<any> {
    return this.http.get<getAllProductDetails[]>(
      `http://localhost:3000/products/one/${id}`
    );
  }
}
