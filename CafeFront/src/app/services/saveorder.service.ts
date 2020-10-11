import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SaveorderService {
  menu: any = []
  promotions:Array<any> = []

  
  constructor() { }
  
  getPromotion() {
    return this.promotions
  }
  setPromotion(promotions) {
    this.promotions.push(promotions)
  }
 
  getMenu() {
    return this.menu
  }
  setMenu(menu) {
    console.log(this.menu)
    console.log(menu)
    this.menu.push(menu);
  }
}
