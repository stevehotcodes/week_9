import { TestBed } from '@angular/core/testing';

import { CartService } from './cart.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('CartService', () => {
  let service: CartService;
  let httpMock:HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[CartService],
      imports:[HttpClientTestingModule]
    });
    service = TestBed.inject(CartService);
    httpMock:TestBed.inject(HttpTestingController)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });



  it('should get cart',()=>{
    service.getCart().subscribe(
      res=>{
        expect(res).toEqual(res)
      }
    )

    const req=httpMock.expectOne('http://localhost:3000/cart')
    expect(req.request.method).toEqual('GET')
      req.flush(res)
     
  })
});
