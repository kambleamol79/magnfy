import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from '../../_helpers';
import { AuthService } from '../../_services';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  registrationForm: FormGroup;
  submitted = false;

  constructor(public fb: FormBuilder, private _authService: AuthService) {
  }

  ngOnInit() {
    this.registrationForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.pattern('^[_A-z0-9 ]*((-|\s)*[_A-z0-9 ])*$')]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      usertype: ['Personal', [Validators.required]],
      password: ['', [Validators.required, Validators.pattern('^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\\D*\\d)[A-Za-z\\d!$%@#£€*?&]{8,}$')]],
      password_confirmation: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'password_confirmation')
    });
  }

  get f() {
    return this.registrationForm.controls;
  }

  // Submit Registration Form
  onSubmit() {
    //console.log(this.registrationForm);
    this.submitted = true;

        // stop here if form is invalid
        if (this.registrationForm.invalid) {
            return;
        }

        this._authService.register(this.registrationForm.value).subscribe(res => {
          //console.log(res);
          this.onReset();
        });

       // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registrationForm.value))
  } 

  onReset() {
    this.submitted = false;
    this.registrationForm.reset();
    this.registrationForm.controls['usertype'].patchValue('Personal');
    this.registrationForm.controls['usertype'].updateValueAndValidity();
  }

}
