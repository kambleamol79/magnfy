import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../_services';
import { Router} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';  

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  isRemeberChecked: boolean = false;
  show: boolean = false;

  constructor( private router: Router, public fb: FormBuilder, private _authService: AuthService, private cookieService: CookieService) {
      let cookieToken = this.cookieService.get('authToken');
      const user = JSON.parse(localStorage.getItem('auth'));
      if(user && (cookieToken == user.access_token)){
        this.router.navigate(['/dashboard']);
      }
   }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', [Validators.required, Validators.pattern('^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\\D*\\d)[A-Za-z\\d!$%@#£€*?&]{8,}$')]],
      remeber_me: [''],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  // Submit Registration Form
  onSubmit() {
     //console.log(this.registrationForm);
     this.submitted = true;

     // stop here if form is invalid
     if (this.loginForm.invalid) {
         return;
     }
    let email = this.loginForm.controls['email'].value;
    let password = this.loginForm.controls['password'].value;
    this._authService.login(email, password).subscribe(res => {
      //console.log(res);
      if(res){
        if(this.isRemeberChecked === true){
          this.cookieService.set('authToken', res.access_token); 
        }
        
        this.router.navigate(['/dashboard']);
      }
      
    });
  }

  onCheckboxChange(e) {
    if (e.target.checked) {
      this.isRemeberChecked = true;
    }else{
      this.isRemeberChecked = false;
    }
  }

  showPassword(){
    this.show = true;
  }

  hidePassword(){
    this.show = false;
  }


}