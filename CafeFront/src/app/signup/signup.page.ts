import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../services/customer.service';
import { FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  get name() {
    return this.registrationForm.get("name");
  }
  get email() {
    return this.registrationForm.get("email");
  }
  get phone() {
    return this.registrationForm.get('phone');
  }
  get point() {
    return this.registrationForm.get("point");
  }
  get username() {
    return this.registrationForm.get("username");
  }
  public errorMessages = {
    name: [
      { type: 'required', message: 'Name is required' },
      { type: 'maxlength', message: 'Name cant be longer than 20 characters' }
    ],
    email: [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Please enter a valid email address' }
    ],
    phone: [
      { type: 'required', message: 'Phone number is required' },
      { type: 'pattern', message: 'Please enter a valid phone number' }
    ],
    username: [
      { type: 'required', message: 'Name is required' },
      { type: 'maxlength', message: 'Name cant be longer than 20 characters' }
    ],
    password: [
      { type: 'required', message: 'Name is required' },
      { type: 'maxlength', message: 'Name cant be longer than 20 characters' }
    ]
    
  };
  todo = {}
  private userForm: FormGroup;
  registrationForm = this.formBuilder.group({
    name: ['',[Validators.required, Validators.maxLength(20)]],
    email: ['',[
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$')
    ]],
    phone: ['',[
      Validators.required,
      Validators.minLength(10),Validators.maxLength(10),Validators.pattern('[0-9]{10}')
    ]],
    username: ['',[Validators.required, Validators.maxLength(20)]],
    password: ['',[Validators.required, Validators.maxLength(20)]],
    point: ['0',[Validators.required]]
  });
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cs: CustomerService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    
  }
 

  public signup() {
    if(!this.registrationForm.value){
      return alert('Signup form invalid')
    }
    this.cs.addCustomer(this.registrationForm.value).subscribe(
      data => {
        alert('Signup successfully');
        this.router.navigate(['/login'])
        this.resetForm();
      },
      err =>{
        console.log(err);
      });
    console.log(this.registrationForm.value)
  }
  onLoading() {
    
  }
  resetForm(){
    this.registrationForm.reset();
  }
  
}
