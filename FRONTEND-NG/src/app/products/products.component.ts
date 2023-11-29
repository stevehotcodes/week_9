import { Component } from '@angular/core';
import { getAllProductDetails } from '../interfaces/productInterface';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  allProducts: getAllProductDetails[] = [];
  constructor(private productService: ProductsService) {}
  ngOnInit() {
    this.getAllProductDetails();
  }
  getAllProductDetails() {
    this.productService.getAllProducts().subscribe((data) => {
      console.log(data);

      this.allProducts = data;
      // console.log(this.allProducts);
    });
  }
}
