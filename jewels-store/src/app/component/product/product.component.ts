import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/service/cart.service';
import { LocalStorageService } from 'src/app/service/local-storage.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  public productsList:any = [];
  public sub: Subscription;

  constructor(private api : ProductService, private cartService : CartService, private localDbService : LocalStorageService ,private router : ActivatedRoute) { }

  ngOnInit(): void {
    this.sub = this.router.paramMap.subscribe(
      params => {
        let catId = parseInt(params.get('cat_id'));
        if(catId > 0)
        {
          this.api.filterByCatgory(catId).subscribe(res=>{ this.productsList = res;});
        }
        else
        {
          this.api.getProducts().subscribe(res=>{ this.productsList = res;});
        }
      }
    );
  }

  addItem(item: any){
    if(confirm("Do you want to add '"+ item.name +"' to your cart"))
    {
      this.localDbService.add(item.id,item);
      this.cartService.addItem(item);
    }
  }


}
