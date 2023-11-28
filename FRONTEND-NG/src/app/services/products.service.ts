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
  private apiUrl = 'http://localhost:3000/products/new';

  constructor(private http: HttpClient) {}

  addProduct(product: productDetails): Observable<any> {
    return this.http.post<any>(this.apiUrl, product);
  }
  // async getProducts() {

  //   let res = await fetch('http://localhost:3000/products/all', {
  //     headers: {
  //       'content-type': 'application/json',
  //     },
  //   });
  //   let data = await res.json();
  //   return data;
  // }
  getAllProducts(): Observable<any> {
    return this.http.get<getAllProductDetails[]>(
      'http://localhost:3000/products/all'
    );
  }
}
