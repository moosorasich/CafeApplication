import { Injectable } from '@angular/core'
import { LocalStorageService } from 'angular-web-storage'
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ShopselectService {
  shop: any
  constructor(private http : HttpClient,private ls : LocalStorageService) { 
  }
  getShop(id){const headers = {'authorization': this.ls.get('user').token}
    return this.http.get<any>(`http://localhost:3000/shops/getshop/${id}`,{headers}).pipe(map( data => {
      if(data){
        this.shop = data
 
      }
      return this.shop
    }))
  }
  
  getAllShops(){const headers = {'authorization': this.ls.get('user').token}
      return this.http.get<any>('http://localhost:3000/shops/getshop',{headers}).pipe
      (map(data => {
        if(data){
          this.shop = data

        }
        return this.shop
      }))
  }
}
