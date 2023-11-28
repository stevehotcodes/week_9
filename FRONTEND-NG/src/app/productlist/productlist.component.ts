import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css'],
})
export class ProductlistComponent {
  updateForm!: FormGroup;
  showForm = false;
  showProduct = false;
  showStock = true;

  viewProduct() {
    this.showProduct = true;
    this.showStock = false;
  }
  hideProduct() {
    this.showProduct = false;
    this.showStock = true;
  }
  hideForm() {
    this.showForm = false;
    this.showStock = true;
  }
  editForm() {
    this.showForm = true;
    this.showStock = false;
  }
}
