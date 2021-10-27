import { Injectable } from '@angular/core';

declare var db: any;

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  public localeDB = "jewels_store_db";


  constructor() { }
  // add & update 
  add(keyName, value){
    return new Promise(async(resolve, rejects)=>{
      if(db != undefined)
      {
        const request = await db.transaction([this.localeDB], "readwrite").objectStore(this.localeDB).put(value, keyName);
        request.onsuccess = await function(event){
          if(event.target.result)
          {
            console.log("Data has been added");
            resolve("Success");
          }
          else
          {
            console.log("Data adding error");
            rejects(false);
          }
        }
      }
    }
    );
  }

  // get data from Indexed-DB
  get(keyName){
    return new Promise(async(resolve, rejects)=>{
      if(db != undefined)
      {
        const request = await db.transaction([this.localeDB], "readwrite").objectStore(this.localeDB).get(keyName);
        request.onsuccess = await function(event){
          if(event.target.result)
          {
            console.log("Data has been fetched");
            resolve("Success");
          }
          else
          {
            console.log("Data fetching error");
            rejects(false);
          }
        }
      }
    }
    );
  }

  // delete data from Indexed-DB
  delete(keyName){
    return new Promise(async(resolve, rejects)=>{
      if(db != undefined)
      {
        const request = await db.transaction([this.localeDB], "readwrite").objectStore(this.localeDB).delete(keyName);
        request.onsuccess = await function(event){
          if(event.target.result)
          {
            console.log("Data has been deleted");
            resolve(true);
          }
          else
          {
            console.log("Data deletion error");
            rejects(false);
          }
        }
      }
    }
    );
  }

}
