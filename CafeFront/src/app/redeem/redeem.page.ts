import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'angular-web-storage'
import {RedeemService} from '../services/redeem.service'
import { CustomerService } from '../services/customer.service'
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-redeem',
  templateUrl: './redeem.page.html',
  styleUrls: ['./redeem.page.scss'],
})
export class RedeemPage implements OnInit {
  name: string
  points: number
  promotions:any
  shop: any
  promotionForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
    discount: new FormControl('', [Validators.required,Validators.min(0),Validators.max(100)]),
    point: new FormControl('', [Validators.required,Validators.min(0)]),
    shop: new FormControl('', [Validators.required])
  });
  constructor(
    private local: LocalStorageService,
    private rd: RedeemService,
    private cs: CustomerService) { 
      try{
        this.promotionForm.get("shop").setValue(this.local.get('shop').id)
        
      }catch(err){
        console.log(err);
      }
    this.ShowPromotion();
    this.ShowPoint();
    }

  ngOnInit() {
    console.log(this.ShowPoint())
    console.log(this.ShowName())
    }
  ShowPromotion() {
      try {
        this.rd.getPromotionShop(this.promotionForm.get("shop").value).subscribe(
          data => {
            this.promotions = data;
        },
          err => {
            console.log(err)
          });
      } catch (error) {
          console.log(error)
      }
    }
  ShowName() {
    this.name = this.cs.getName();
    return this.cs.getName()
  }
  ShowPoint() {
    this.points = this.cs.getPoint();
    return this.cs.getPoint()
  }

}
