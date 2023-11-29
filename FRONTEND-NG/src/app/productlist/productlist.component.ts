import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { getAllProductDetails } from '../interfaces/productInterface';
import { ProductsService } from '../services/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css'],
})
export class ProductlistComponent {
  updateForm!: FormGroup;
  viewSingleProduct: getAllProductDetails[] = [];
  showForm = false;
  showProduct = false;
  showStock = true;

  constructor(
    private productService: ProductsService,
    private router: Router
  ) {}
  ngOnInit() {
    this.getAllProductDetails();
  }

  viewProduct() {
    //   this.productService
    //     .getProductByI(id)
    //     ?.subscribe((response: getAllProductDetails[]) => {
    //       this.viewSingleProduct = response;
    this.showProduct = true;
    this.showStock = false;
    this.showForm = false;
    //       console.log(this.viewSingleProduct);
    //     });
  }
  hideProduct() {
    this.showProduct = false;
    this.showStock = true;
    this.showForm = false;
  }
  hideForm() {
    this.showForm = false;
    this.showStock = true;
    this.showProduct = false;
  }
  editForm() {
    this.showForm = true;
    this.showStock = false;
    this.showProduct = false;
  }

  allProducts: getAllProductDetails[] = [];

  getAllProductDetails() {
    this.productService.getAllProducts().subscribe((data) => {
      console.log(data);
      this.allProducts = data;
    });
  }
}
