import { Component, OnInit ,OnChanges} from '@angular/core'
import { Router } from '@angular/router'
import { MenuController, ModalController } from '@ionic/angular'
import { MenuService } from '../services/menu.service'
import { OrderService } from '../services/order.service'
import { LocalStorageService } from 'angular-web-storage'
import { AlertController } from '@ionic/angular'
import { SaveorderService } from '../services/saveorder.service'
import { CustomerService } from '../services/customer.service'
import { DomSanitizer } from '@angular/platform-browser'
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { RedeemService } from '../services/redeem.service'

declare var require: any

@Component({
  selector: 'app-paymodal',
  templateUrl: './paymodal.component.html',
  styleUrls: ['./paymodal.component.scss'],
})
export class PaymodalComponent implements OnInit {
  OrderSelect: any
  menu: any
  selectMenu: any[] = []
  shop: String
  promptpay: any
  customerPhoneNumber: string
  Sum: number = 0
  Sumfinal: number
  customer: any
  customerId: any
  customerPoint: number = 0
  customerTelUse: any
  promotionName: String
  promotionDiscount: number = 0
  promotionPoint: number = 0
  promotions: Array<any> = []
  shops: any
  data: any
  name: string
  svg: String

  orderForm = this.formBuilder.group({
    id: ['', [Validators.required]],
    promotion: ['ไม่ได้ใช้โปรโมชั่น', []],
    paymentMethod: ['', [Validators.required]],
  })
  promotionForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    type: ['', [Validators.required]],
    discount: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
    point: ['', [Validators.required, Validators.min(0)]],
    shop: ['', [Validators.required]]
  });

  constructor(private modalCtrl: ModalController,
   
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
    private sanitizer: DomSanitizer) {
    this.shop = this.ls.get('shop').id
    this.promptpay = this.ls.get('shop').promptpay
    try {
      this.promotionForm.get("shop").setValue(this.ls.get('shop').id)

    } catch (err) {
      console.log(err);
    }
    this.rd.getPromotionShop(this.shop).subscribe(data => {
      this.promotions.push({ name: "ไม่ใช้โปรโมชั่น", point: 0, discount: 0 })
      data.forEach(index => { this.promotions.push(index) })
      console.log(this.promotions)
    })
    this.ShowPoint()
    this.ShowPhone()
  }
  
  ngOnInit() {
    this.ShowPoint();
    console.log(this.so.getMenu())
    this.selectMenu = this.so.getMenu()
    this.SumPrice(this.selectMenu)
    this.Sum = this.SumPrice(this.selectMenu)
    console.log(this.Sum)
    console.log(this.cs.getPhone())
    console.log(this.cs.getPoint())
  }
  
  addMenu(selMenu) {
    this.selectMenu.push(selMenu)
    console.log(this.selectMenu)
  }
  getPromotionShop() {
    this.rd.getPromotionShop(this.shop).subscribe(data => {
      this.promotions = data

    })
    console.log(this.promotions)
  }
  selectPromotion(x) {
    this.orderForm.get('promotion').setValue(this.promotions[x].name)
    this.promotionPoint = this.promotions[x].point
    this.promotionDiscount = this.promotions[x].discount
    console.log(this.promotionPoint)
    console.log(this.promotionDiscount)
    console.log(this.orderForm.get('promotion').value)
    console.log(x)
  }
  async getQRcode(phone, Sumex) {
    const qrcode = require('qrcode')
    const generatePayload = require('promptpay-qr')
    const amount = Sumex
    console.log(Sumex)
    const payload = generatePayload(phone, { amount })

    console.log(payload)
    const options = { type: 'svg', color: { dark: '#4287f5', light: '#ffffff' } }
    return await qrcode.toString(payload, options, (err, svg) => {
      if (err) return -1
      console.log(svg)
      this.data = this.sanitizer.bypassSecurityTrustHtml(svg)
    })
  }
  SumPrice(order:any) {
    var i = 0;
    var sumPrice = 0;
    for (i; i < order.length; i++){
      sumPrice += order[i].price;
    }
    return sumPrice
  }
  ShowPhone() {
    this.customerPhoneNumber = this.cs.getPhone()
    return this.cs.getPhone()
  }
  ShowName() {
    this.name = this.cs.getName();
    return this.cs.getName()
  }
  ShowPoint() {
    this.customerPoint = this.cs.getPoint();

    return this.cs.getPoint()
  }
  getCustomerTel() {
    this.name = ''
    var qrtel = ''
    var Sumex = this.Sum
    var Sumall = this.Sum
    var Discount = this.promotionDiscount
    console.log(Sumex)
    qrtel = qrtel + this.promptpay.substr(0, 3) + "-"
    qrtel = qrtel + this.promptpay.substr(3, 3) + "-"
    qrtel = qrtel + this.promptpay.substr(6, 4)
    this.customerPoint = 0
    this.customerId = this.cs.getID()
    this.customerPoint = this.cs.getPoint()
    console.log(this.customerPoint)
      console.log(this.customerId)
      Sumex = Sumall - (Sumall * (Discount / 100))
      console.log(Sumex)
      this.getQRcode(qrtel, Sumex)
      this.Sumfinal = Sumex
      console.log(this.Sumfinal)
      console.log(qrtel)

    this.Sumfinal = Sumex
    console.log(this.Sumfinal)
    this.getQRcode(qrtel, Sumex)
  }
  Pay() {
    console.log("this menu " + this.selectMenu + "this order" + this.OrderSelect + "This shop" + this.shop)
    if (!this.selectMenu.length) {
      return alert('Payment form is not valid')
    }
    if(this.customerPoint<this.promotionPoint){
      this.customerPoint = 0
      return alert('เเต้มไม่พอใช้')
    }
    const payload = {
      menu: this.selectMenu,
      id: this.orderForm.get('id').value,
      paymentStatus: true,
      paymentDate: new Date(),
      paymentMethod: 'โอนเงิน',
      quantity:this.selectMenu.length,
      customerPhoneNumber:this.customerPhoneNumber,
      shop: this.shop,
      promotion: this.orderForm.get('promotion').value,
      totalPrice: this.Sumfinal,
      done:false
    }
    console.log(payload)
    this.os.addOrder(payload).subscribe(data => {

      alert('Payment success.')

    }, err => {
      console.log('Payment failed.\n Err:', err)
    })
    const changepoint = {
      id: this.customerId,
      point: this.customerPoint-this.promotionPoint+this.selectMenu.length
    }
    console.log(changepoint)
    this.cs.updateCustomer(changepoint).subscribe(data => {

    }, err => {
      console.log('Point is failed to update.\n Err:', err)
    })
  }
  reset(index) {
      this.selectMenu.splice(index)
      console.log(this.selectMenu)
  }  

  dismissModal() {
    this.modalCtrl.dismiss();
    this.reset(this.selectMenu)
  }

}
