export interface productDetails {
  productName: string;
  productDescription: string;
  price: Number;
  productImageURL: string;
  productStock: number;
  category: string;
}

export interface getAllProductDetails {
  products: getAllProductDetails[];
  id: string;
  productName: string;
  productDescription: string;
  price: Number;
  productImageURL: string;
  productStock: number;
  isDeleted: boolean;
  category: string;
}
