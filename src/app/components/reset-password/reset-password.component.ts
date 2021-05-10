import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService, AppService, AlertService } from '../../_services';
import { MustMatch } from '../../_helpers';
import { Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  resetForm: FormGroup;
  email: string
  submitted = false;
  show: boolean = false;

  constructor( 
    private router: Router, 
    public fb: FormBuilder, 
    private _authService: AuthService, 
    private _appService: AppService, 
    private alertService: AlertService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.email = params['email'];
    });
    this.resetForm = this.fb.group({     
      email: [ this.email],
      password: ['', [Validators.required, Validators.pattern('^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\\D*\\d)[A-Za-z\\d!$%@#£€*?&]{8,}$')]],
      password_confirmation: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'password_confirmation')
    });

    console.log(this.resetForm.value);
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
    this._authService.reset_password(this.resetForm.value).subscribe(res => {
      console.log(res);
      
    });
  }

  showPassword(){
    this.show = true;
  }

  hidePassword(){
    this.show = false;
  }

}
