import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {map} from 'rxjs/operators'
import {LocalStorageService} from 'angular-web-storage'
@Injectable({
  providedIn: 'root'
})
export class OrderService {

  order : any
  URL = 'http://localhost:3000'

  constructor(private http : HttpClient,private ls : LocalStorageService) { 
    
  }
  

  addOrder(order){
     const headers = {'authorization': this.ls.get('user').token}
    return this.http.post<any>(`${this.URL}/orders/addOrder`,order,{headers}).pipe(
      map(data => {
        
        return data
      })
    )
  }
  updateOrder(newOrder){
    const headers = {'authorization': this.ls.get('user').token}
    return this.http.put<any>(`${this.URL}/orders/updateOrder`,newOrder,{headers}).pipe(
      map(data => {
        return data
      })
    )
  }

  getOrder(id,shop){
    const headers = {'authorization': this.ls.get('user').token}
    return this.http.get<any>(`${this.URL}/orders/getdOrder/${shop}/${id}`,{headers}).pipe(
      map(data => {
        if(data){
          this.order = data
          
        }
        return this.order
      })
    )
  }
  getAllOrders(shop,paymentstatus='false'){
    const headers = {'authorization': this.ls.get('user').token}
    return this.http.get<any>(`${this.URL}/orders/getOrder/${shop}/${paymentstatus}`,{headers}).pipe(
      map(data => {
        if(data){
          this.order = data
         
        }
        return this.order
      })
    )
  }
  getMenuFromOrders(shop,name){
    const headers = {'authorization': this.ls.get('user').token}
    return this.http.get<any>(`${this.URL}/orders/findmenu/${shop}/${name}`,{headers}).pipe(
      map(data => {
        if(data){
          this.order = data

        }
        return this.order
      })
    )
  }



}
