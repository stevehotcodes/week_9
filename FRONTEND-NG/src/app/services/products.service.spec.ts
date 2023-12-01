import { TestBed } from '@angular/core/testing';

import { ProductsService } from './products.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { getAllProductDetails, productDetails } from '../interfaces/productInterface';

describe('ProductsService', () => {
  let service: ProductsService;
  let httpMock:HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[ProductsService],
      imports:[HttpClientTestingModule]

    });
    service = TestBed.inject(ProductsService);
    httpMock=TestBed.inject(HttpTestingController)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should add product',()=>{

    let mockedProductInput:any;
    let mockedResponse:{message:string}={message:"product created successfully"}
    service.addProduct(mockedProductInput).subscribe(
      res=>{
        return expect(res).toEqual(mockedResponse)
      }
    )
    const req=httpMock.expectOne('http://localhost:3000/products/new');
    expect(req.request.method).toEqual('POST');
    req.flush(mockedResponse)

  })

  it('get all products',()=>{
    let mockedResponse:productDetails[]=[]
    service.getAllProducts().subscribe((res:productDetails[])=>{
      return expect(res).toEqual(mockedResponse)
    })

      const req=httpMock.expectOne('http://localhost:3000/products/all');
      expect(req.request.method).toEqual('GET')
      req.flush(mockedResponse)
  })

  it('should get one product',()=>{
      let mockedID='mockedidjduebruner'
      let mockedProduct:any
      service.getProductByID(mockedID).subscribe(
        res=>{
          return expect(res).toEqual(mockedProduct);

        }
      )

      const req=httpMock.expectOne(`http://localhost:3000/product/one/${mockedID}`)
      expect(req.request.method).toEqual('GET')
      req.flush(mockedProduct)
  })

  it('should update a product',()=>{
    let mockedProductId='mockeidIsnisncusjsc';
    let mockedUpdateData:any
    let mockedResponse:{message:any}={message:"the product's details was updated successfully "}
    
    service.updateProduct(mockedProductId,mockedUpdateData).subscribe(
      res=>{
        return expect(res).toEqual(mockedResponse)
      }
    )
    const req=httpMock.expectOne(`http://localhost:3000/product/one/${mockedProductId}`)
    expect(req.request.method).toEqual('PATCH')
    req.flush(mockedResponse)


  })
  


});

 