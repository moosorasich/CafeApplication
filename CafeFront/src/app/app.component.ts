import { Component, OnChanges, OnInit } from '@angular/core';
import { CustomerService } from './services/customer.service';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  email: string
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'เมนู',
      url: '/menu',
      icon: 'add-circle'
    },
    {
      title: 'ออเดอร์',
      url: '/order',
      icon: 'paper-plane'
    },
    {
      title: 'โค้ดโปรโมชั่น',
      url: '/redeem',
      icon: 'archive'
    },
    {
      title: 'ออกจากระบบ',
      url: '/login',
      icon: 'log-out'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private cs: CustomerService
  ) {
    this.initializeApp();

  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    this.getEmail()
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }
  getEmail() {
   this.email = this.cs.getEmail()
    return this.cs.getEmail()
  }
  receiveMessage($event) {
    console.log($event)
    this.email = $event
  }
}
