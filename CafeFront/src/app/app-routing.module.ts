import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'home/:id', loadChildren: () => import('./folder/folder.module').then(m => m.FolderPageModule)},
  { path: 'login',loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)},
  { path: 'signup',loadChildren: () => import('./signup/signup.module').then( m => m.SignupPageModule)},
  { path: 'selectshop',loadChildren: () => import('./selectshop/selectshop.module').then( m => m.SelectshopPageModule)},
  { path: 'menu',loadChildren: () => import('./menu/menu.module').then( m => m.MenuPageModule)},
  { path: 'order',loadChildren: () => import('./order/order.module').then( m => m.OrderPageModule)},
  { path: 'redeem',loadChildren: () => import('./redeem/redeem.module').then( m => m.RedeemPageModule)},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
