import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectshopPageRoutingModule } from './selectshop-routing.module';

import { SelectshopPage } from './selectshop.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectshopPageRoutingModule
  ],
  declarations: [SelectshopPage]
})
export class SelectshopPageModule {}
