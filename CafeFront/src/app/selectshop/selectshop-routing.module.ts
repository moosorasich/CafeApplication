import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectshopPage } from './selectshop.page';

const routes: Routes = [
  {
    path: '',
    component: SelectshopPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectshopPageRoutingModule {}
