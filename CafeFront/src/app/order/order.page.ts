import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import {  MenuController, ModalController } from '@ionic/angular'
import { MenuService } from '../services/menu.service'
import { OrderService} from '../services/order.service'
import {LocalStorageService} from 'angular-web-storage'
import { AlertController } from '@ionic/angular'
import { SaveorderService } from '../services/saveorder.service'
import { CustomerService } from '../services/customer.service'
import { DomSanitizer } from '@angular/platform-browser'
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import {RedeemService} from '../services/redeem.service'
import { PaymodalComponent } from '../paymodal/paymodal.component'




@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {
  
  
  menu: any
  selectMenu:any[] = []
  shop: String
  customer: any
  shops: any
  name: string
  
  
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    public menuCtrl: MenuController,
    private ms: MenuService,
    private os: OrderService,
    private so: SaveorderService,
    private cs: CustomerService,
    private rd: RedeemService,
    public alertController: AlertController,
    private ls: LocalStorageService,
    private modalCtrl: ModalController,
    private sanitizer: DomSanitizer) {
    this.shop = this.ls.get('shop').id
  }
  
  ngOnInit() {
    console.log(this.so.getMenu())
    this.selectMenu = this.so.getMenu()
    console.log(this.cs.getPhone())
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
  addMenu(selMenu) {
    this.selectMenu.push(selMenu)
    console.log(this.selectMenu)
  }
  
  async openModal() {
    const modal = await this.modalCtrl.create({
      component: PaymodalComponent
    })
      
    await modal.present();
  }
}
