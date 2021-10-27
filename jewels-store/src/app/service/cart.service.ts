import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public cartItemList:any=[];
  public productList=new BehaviorSubject<any>([]);

  constructor() { }
  
  getProducts(){
    return this.productList.asObservable();
  }

  
  setProduct(product : any){
    this.cartItemList.push(...product);
    this.productList.next(product);
  }

  addItem(product : any){
    this.cartItemList.push(product);
    this.productList.next(this.cartItemList);
    this.getAmount();
  }

  getAmount() : number{
    let amount = 0;
    this.cartItemList.map((a:any)=>{
      amount += a.price;
    });
    return amount;
  }

  removeItem(product: any){
    this.cartItemList.map((a:any, index:any)=>{
      if(product.id=== a.id){
        this.cartItemList.splice(index,1);
      }
    });
    this.productList.next(this.cartItemList);
  }

  removeAll(){
    this.cartItemList = [];
    this.productList.next(this.cartItemList);
  }
}
