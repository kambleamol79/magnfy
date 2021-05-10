import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService, AppService, AlertService } from '../../_services';
import { Router} from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  resetForm: FormGroup;
  submitted = false;
  show: boolean = false;

  constructor( private router: Router, public fb: FormBuilder, private _authService: AuthService, private _appService: AppService, private alertService: AlertService) { }

  ngOnInit(): void {
    this.resetForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$')]]
    });
  }

  get f() {
    return this.resetForm.controls;
  }

  // Submit Registration Form
  onSubmit() {
     //console.log(this.registrationForm);
     this.submitted = true;

     // stop here if form is invalid
     if (this.resetForm.invalid) {
         return;
     }
    let email = this.resetForm.controls['email'].value;
    this._authService.forgot_password(email).subscribe(res => {
      this.alertService.success(res['message']);
    });
  }

  

}
