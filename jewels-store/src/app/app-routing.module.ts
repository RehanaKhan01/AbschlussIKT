import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartComponent } from './component/cart/cart.component';
import { ProductComponent } from './component/product/product.component';
import {CheckoutComponent} from "./component/checkout/checkout.component";

const routes: Routes = [
  {path:'', redirectTo:'products', pathMatch:'full'},
  {path:'products', component : ProductComponent},
  {path:'products/:cat_id', component : ProductComponent},
  {path:'cart', component : CartComponent},
  {path:'checkout', component : CheckoutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
