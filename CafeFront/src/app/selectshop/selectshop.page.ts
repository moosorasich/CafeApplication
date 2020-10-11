import { Component, OnInit } from '@angular/core';
import { ShopselectService } from '../services/shopselect.service'
import { Router, ActivatedRoute } from '@angular/router';
import {LocalStorageService} from 'angular-web-storage'

@Component({
  selector: 'app-selectshop',
  templateUrl: './selectshop.page.html',
  styleUrls: ['./selectshop.page.scss'],
})
export class SelectshopPage implements OnInit {
  
  shop: any
  id : String
  constructor(private sh: ShopselectService,
              private local : LocalStorageService,
              private router : Router)
  {
    try{
      this.id = local.get('user').result.id
      console.log(this.id)
      this.onLoading()
    }catch(err){
      console.log(err);
    }
  }

  ngOnInit() {
    
  }
  clickShop(data){
    console.log(data)
    
    this.local.set('shop',data,1,'w')

  }

  onLoading() {
    try {
      this.sh.getAllShops().subscribe(data => {
       console.log(data)
       this.shop = data
     })
    } catch (error) {
        console.log(error)
    }
  }
  
}
