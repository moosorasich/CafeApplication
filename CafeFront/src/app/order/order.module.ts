import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { IonicModule } from '@ionic/angular';

import { OrderPageRoutingModule } from './order-routing.module';

import { OrderPage } from './order.page';
import { PaymodalComponent } from '../paymodal/paymodal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderPageRoutingModule,
    NgxQRCodeModule
  ],
  declarations: [OrderPage, PaymodalComponent],
  entryComponents:[PaymodalComponent]
})
export class OrderPageModule {}
