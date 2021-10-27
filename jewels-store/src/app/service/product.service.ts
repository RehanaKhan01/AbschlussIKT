import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http : HttpClient) { }

  getProducts(){
    return this.http.get<any>(
      "http://127.0.0.1/jewels_store/backend/api/products.php"
      ).pipe(
        map(
          (res:any)=>{
            return res;
          }
        )
      );
  }

  filterByCatgory(catId){
    // Setup Catgory Id query parameter
    let parameters = new HttpParams().set('category', catId);
    return this.http.get<any>(
      "http://127.0.0.1/jewels_store/backend/api/products.php",
      {params: parameters}
      ).pipe(
        map(
          (res:any)=>{
            return res;
          }
        )
      );
  }
}
