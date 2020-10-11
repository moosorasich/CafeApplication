import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {map} from 'rxjs/operators'
import {LocalStorageService} from 'angular-web-storage'
@Injectable({
  providedIn: 'root'
})
export class MenuService {

  menu: any
  URL = 'http://localhost:3000/'

  constructor(private http : HttpClient,private ls : LocalStorageService) { 
    
  }

  addMenu(menu){const headers = {'authorization': this.ls.get('user').token}
    return this.http.post<any>(`${this.URL}menu/addMenu`,menu,{headers}).pipe(
      map(data =>{
        return data
      })
    )
  }

  getAllMenu(){const headers = {'authorization': this.ls.get('user').token}
    return this.http.get<any>(`${this.URL}menu/getMenu`,{headers}).pipe(
      map(data => {
        if(data){
          this.menu = data
    
        }
        return this.menu
      })
    )
  }


  updateMenu(menu){
   const headers = {'authorization': this.ls.get('user').token}
    return this.http.put<any>(`${this.URL}menu/updatemenus`,menu,{headers}).pipe(
      map(data =>{
        return data
      })
    )
  }

  deleteitem(id){const headers = {'authorization': this.ls.get('user').token}
    return this.http.delete(`${this.URL}menu/delete/${id}`,{headers});
  }

  getMenuShop(id){const headers = {'authorization': this.ls.get('user').token}
    return this.http.get<any>(`http://localhost:3000/menu/getMenuShop/${id}`,{headers}).pipe(map( data => {
      if(data){
        this.menu = data

      }
      return this.menu
    }))
  }
  getMenuTypeShop(shop,type){const headers = {'authorization': this.ls.get('user').token}
    return this.http.get<any>(`http://localhost:3000/menu/getType/${shop}/${type}`,{headers}).pipe(map( data => {
      if(data){
        this.menu = data

      }
      return this.menu
    }))
  }


}




