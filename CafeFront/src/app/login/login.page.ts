import { Component, OnInit,Output, EventEmitter  } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { CustomerService } from '../services/customer.service';
import {  MenuController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  

  username: string;
  password: string;
  @Output() messageEvent = new EventEmitter<string>();
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cs: CustomerService,
    public menuCtrl: MenuController
  ) { }

  ngOnInit() {
    this.ionViewWillEnter()
  }
  resetForm(){
    this.username = ""
    this.password = ""
  }
  login() {
    console.log(this.username)
    const cus = {username:this.username,password:this.password}
    this.cs.login(cus).subscribe(
      data => {
        if (data) {
          console.log(this.cs.getEmail())
          this.messageEvent.emit(this.cs.getEmail())
          this.router.navigate(['/selectshop'])
          this.resetForm()
        }
        else{
          alert('Username or Password is incorrect')
          this.resetForm()
        }
      },
      err => {
        alert('Username or Password is incorrect')
        this.resetForm()
      }
    )
  }
  ionViewWillEnter() {
    this.menuCtrl.enable(false);
   }
}
