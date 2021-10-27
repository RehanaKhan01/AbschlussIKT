import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
import { LocalStorageService } from 'src/app/service/local-storage.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public productsList : any = [];
  public amount: number = 0;

  constructor(private cartService : CartService, private localDbService : LocalStorageService) { }

  ngOnInit(): void {
    this.cartService.getProducts()
    .subscribe(res=>{
      this.productsList = res;
      this.amount = this.cartService.getAmount();
    });
  }

  removeItem(item : any){
    this.localDbService.delete(item.id);
    this.cartService.removeItem(item);
  }

  emptyCart()
  {
    this.productsList.forEach(element => {
      this.localDbService.delete(element.id);
    });
    this.cartService.removeAll();
  }


}
