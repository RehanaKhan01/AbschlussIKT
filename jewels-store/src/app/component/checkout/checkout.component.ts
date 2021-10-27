import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
import {LocalStorageService} from "../../service/local-storage.service";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  public productsList : any = [];
  public amount: number = 0;

  constructor(private cartService: CartService, private localDbService : LocalStorageService) { }

  ngOnInit(): void {
    this.cartService.getProducts()
    .subscribe(res=>{
      this.productsList = res;
      this.amount = this.cartService.getAmount();
    });
  }

  emptyCart()
  {
    this.productsList.forEach(element => {
      this.localDbService.delete(element.id);
    });
    this.cartService.removeAll();
  }

  payment()  {
    if(confirm("Do you want continue"))
    {
      alert("Your order is in progress.")
    }
    this.emptyCart();
  }
}
