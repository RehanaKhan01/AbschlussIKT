import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http : HttpClient) { }

  getCategories(){
    return this.http.get<any>(
      "http://127.0.0.1/jewels_store/backend/api/categories.php"
      ).pipe(
        map(
          (res:any)=>{
            return res;
          }
        )
      );
  }
}
