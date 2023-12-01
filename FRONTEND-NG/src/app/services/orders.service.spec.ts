import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'

import { IorderDetailsWithUserInfo, OrdersService } from './orders.service';

describe('OrdersService', () => {
  let service: OrdersService;
  let httpMock:HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[OrdersService],
      imports:[HttpClientTestingModule]
    });
    service = TestBed.inject(OrdersService);
    httpMock = TestBed.inject(HttpTestingController)
    
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all orders',()=>{
      let mockedResponse:IorderDetailsWithUserInfo[]=[]
      service.getAllOrders().subscribe((res:any)=>{
        return expect(res).toEqual(mockedResponse);
      })
      const req = httpMock.expectOne(`http://localhost:3000/order/all`)
      expect(req.request.method).toEqual('GET');
      req.flush(mockedResponse)
  })


  it('should get orders by user',()=>{
    let mockedID='my mocked-user id'

    let mockedResponse:IorderDetailsWithUserInfo[]=[]
    service.getOrdersByUser().subscribe(
      (res:IorderDetailsWithUserInfo[])=>{
        return expect(res).toEqual(mockedResponse)
      }
    )
    const req = httpMock.expectOne(`http://localhost:3000/order/user`)
    expect(req.request.method).toEqual('GET');
    req.flush(mockedResponse)

  })

  it('should the update the order to shipping',()=>{
    let mockedID='1233i3i3ijeetehd'

    let mockedResponse:{message:string}={message:"order status switched to shipping"}
    service.updateOrdertoShipping(mockedID).subscribe(
      (res:any)=>{
        return expect(res).toEqual(mockedResponse)
      }
    )
    const req = httpMock.expectOne(`http://localhost:3000/order/status/shipping/${mockedID}`)
    expect(req.request.method).toEqual('PUT');
    req.flush(mockedResponse)

  })





});
