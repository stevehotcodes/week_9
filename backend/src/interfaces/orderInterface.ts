export interface Iorder{
    id:string
    orderStatus:string
    orderDate:string
    userID:string
}
export interface IorderWithInfo {
    id:string
    userID:string
    status: Tstatus
    orderDate:string
    items:IorderItemInfo[]
}

export interface IorderItemInfo {
    productID:string
    quantity:number
    productName:string
    price:number
    productImageURL:string
}

export type Tstatus = 'processing' | 'shipping' | 'shipped' | 'canceled'