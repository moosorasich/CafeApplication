import { Component, OnInit } from '@angular/core'
import { Router,NavigationExtras } from '@angular/router'
import {  MenuController } from '@ionic/angular'
import { MenuService } from '../services/menu.service'
import { OrderService} from '../services/order.service'
import {LocalStorageService} from 'angular-web-storage'
import { AlertController } from '@ionic/angular';
import {SaveorderService} from '../services/saveorder.service'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  menu: any
  selectMenu:any[] = []
  shop: String
  
  constructor(
    private router: Router,
    public menuCtrl: MenuController,
    private ms: MenuService,
    private os: OrderService,
    private so: SaveorderService,
    public alertController: AlertController,
    private ls: LocalStorageService) {
    this.shop = this.ls.get('shop').id
  }
 
  ngOnInit() {
    this.ionViewWillEnter()
    this.ms.getMenuShop(this.shop).subscribe(data => {
      this.menu = data
      console.log(this.menu)
    })
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Notification',
      message: 'เพิ่มออเดอร์ของคุณเรียบร้อย',
      buttons: ['OK'],
    });
  
    await alert.present();
    let result = await alert.onDidDismiss();
    console.log(result);
  }
  
  All(){
    this.ms.getMenuShop(this.shop).subscribe( data => {
      this.menu = data
      console.log(this.menu)
    })
  }
  Snack(){
    this.ms.getMenuTypeShop(this.shop,"ขนม").subscribe( data => {
      this.menu = data
      console.log(this.menu)
    })
  }
  Promotion(){
    this.ms.getMenuTypeShop(this.shop,"เมนูโปรโมชั่น").subscribe( data => {
      this.menu = data
      console.log(this.menu)
      console.log(this.menu[0].variation)
    })
  }
  ionViewWillEnter() {
    this.menuCtrl.enable(true);
  }
  addMenu(selMenu) {
    this.selectMenu.push(selMenu)
    this.presentAlert()
    this.so.setMenu(selMenu)
    console.log(this.selectMenu)
  }
  deletSelect(index){
   this.selectMenu.splice(index,1)
   console.log(this.selectMenu)
  }
  deleteAllSelect(){
    this.selectMenu = []
    console.log(this.selectMenu)
  }
  SumPrice(order:any) {
    var i = 0;
    var sumPrice = 0;
    for (i; i < order.length; i++){
      sumPrice += order[i].price;
    }
    return sumPrice
  }
  saveOrder(){
    if(this.isMenuEmpty()){
      return alert('No menu selected!.') 
    }
    const payload = {
        menu:this.selectMenu,quantity:this.selectMenu.length,paymentDate:'',paymentStatus:false,paymentMethod:'',customerPhoneNumber:'',totalPrice:this.SumPrice(this.selectMenu),shop:this.shop
    }
   
    this.os.addOrder(payload).subscribe(data => {
      alert('Order added.')
      this.deleteAllSelect()
    },err => {
      console.log(err)
    })
  
  }
  isMenuEmpty(){
    return this.selectMenu.length === 0 ? true : false
  }

}
