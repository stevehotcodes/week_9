import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  getAllProductDetails,
  productDetails,
} from '../interfaces/productInterface';
import { ProductsService } from '../services/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css'],
})
export class ProductlistComponent implements OnInit {
  updateForm!: FormGroup;
  showForm = false;
  showProduct = false;
  showStock = true;
  product_id: string = '';
  product!: productDetails;
  name: string = '';
  allProducts: getAllProductDetails[] = [];

  constructor(
    private productService: ProductsService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.getAllProductDetails();
    this.initializeForm();
    this.product_id;
  }
  onSubmit() {
    this.updateProductDetails();
  }

  initializeForm() {
    this.updateForm = this.formBuilder.group({
      image: [''],
      productName: [''],
      category: [''],
      description: [''],
      quantity: [''],
      price: [''],
    });
  }

  patchvalues = async (id: string) => {
    this.productService
      .getProductByID(id)
      ?.subscribe((response: productDetails) => {
        console.log(response);

        this.updateForm.patchValue({
          image: response.productImageURL,
          productName: response.productName,
          category: response.category,
          description: response.productDescription,
          quantity: response.productStock,
          price: response.price,
        });
      });
  };
  viewProduct(id: string) {
    this.product_id = id;
    console.log('Product ID is ', id);

    this.productService
      .getProductByID(id)
      ?.subscribe((response: productDetails) => {
        this.updateForm.patchValue({
          response,
        });
        this.product = response;
        this.showProduct = true;
        this.showStock = false;
        this.showForm = false;
      });
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
  editForm(product_id: string) {
    localStorage.setItem('product_id', product_id);
    this.patchvalues(product_id);

    this.showForm = true;
    this.showStock = false;
    this.showProduct = false;
    // }
  }

  updateProductDetails() {
    let id = localStorage.getItem('product_id') as string;

    if(!id){console.log("no id");}


    const updatedData = {
      // productName,productDescription,price,productImageUrl,category,productStock
      productImageUrl: this.updateForm.get('image')?.value,
      productName: this.updateForm.get('productName')?.value,
      category: this.updateForm.get('category')?.value,
      productDescription: this.updateForm.get('description')?.value,
      productStock: this.updateForm.get('quantity')?.value,
      price: this.updateForm.get('price')?.value,
    };

    console.log('sdaasdad ', updatedData);

    this.productService
      .updateProduct(id, updatedData)
      .subscribe((response) => {
        console.log('product updated successfully', response);
      });
  }

  getAllProductDetails() {
    this.productService.getAllProducts().subscribe((data) => {
      console.log(data);
      this.allProducts = data;
    });
  }
}
