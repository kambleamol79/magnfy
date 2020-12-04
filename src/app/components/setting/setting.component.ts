import { Component, OnInit } from '@angular/core';
import { FacebookService, AuthService, AppService } from '../../_services';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { trimValidator } from '../../_helpers';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {

  userDataForm: FormGroup;
  userData: any;
  userSortingMethodData: any;
  userNotficationSettingData: any;
  userSortingMethodForm: FormGroup;
  userNotficationSettingForm: FormGroup;
  submitted1: boolean = false;

  constructor(public appServiceL: AppService, public fb: FormBuilder,) { }

  ngOnInit(): void {
    this.userDataForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.pattern('^[_A-z0-9 ]*((-|\s)*[_A-z0-9 ])*$'), trimValidator],],
      username: ['', [Validators.required, trimValidator]],
      city: ['', [Validators.required, trimValidator]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
    });

    this.userSortingMethodForm = this.fb.group({      
      facebook: [false],
      twitter: [false],
      instagram: [false],      
    });

    this.userNotficationSettingForm = this.fb.group({      
      magnfy: [false],
      email: [false],     
    });

    this.getMyProfileData();
    this.getMySortingMethodsData();
    this.getMyNotficationSettinData();
  }

  getMyProfileData(){
    this.appServiceL.getMyProfile().subscribe(res => {
      //console.log(res);
      if(res['status'] == true){
        this.userData = res['data']['data'];
        this.userDataForm.controls['name'].patchValue(this.userData['name']);
        this.userDataForm.controls['username'].patchValue(this.userData['username']);
        this.userDataForm.controls['city'].patchValue(this.userData['city']);
        this.userDataForm.controls['email'].patchValue(this.userData['email']);
      }
    });


  }

  getMySortingMethodsData(){
    this.appServiceL.getMySortingMethods().subscribe(res => {
      //console.log(res);
      if(res['status'] == true && res['data']['data'].length > 0){
        this.userSortingMethodData = res['data']['data'];
        this.userSortingMethodForm.controls['facebook'].patchValue(this.userSortingMethodData[0]['facebook']);
        this.userSortingMethodForm.controls['twitter'].patchValue(this.userSortingMethodData[0]['twitter']);
        this.userSortingMethodForm.controls['instagram'].patchValue(this.userSortingMethodData[0]['instagram']);
      }
    });

  }

  getMyNotficationSettinData(){
    this.appServiceL.getMyNotificationSetting().subscribe(res => {
      //console.log(res);
      if(res['status'] == true && res['data']['data'].length > 0){
        this.userNotficationSettingData = res['data']['data'];
        this.userNotficationSettingForm.controls['magnfy'].patchValue(this.userNotficationSettingData[0]['magnfy']);
        this.userNotficationSettingForm.controls['email'].patchValue(this.userNotficationSettingData[0]['email']);
      }
    });

  }
  
  get f1() {
    return this.userDataForm.controls;
  }

  updateMyData(){
    this.submitted1 = true;
    //console.log(this.userDataForm);
    if(this.userDataForm.invalid){
      return false;
    }
    this.appServiceL.updateUserProfile(this.userDataForm.value).subscribe(res => {
      //console.log(res);
    });
    if( this.userSortingMethodData != undefined && this.userSortingMethodData.length > 0){
      this.appServiceL.updateMySortingMethods(this.userSortingMethodForm.value).subscribe(res => {
        //console.log(res);
      });
    }else{
      this.appServiceL.addMySortingMethods(this.userSortingMethodForm.value).subscribe(res => {
        //console.log(res);
      });
    }    

    if( this.userNotficationSettingData != undefined && this.userNotficationSettingData.length > 0){
      this.appServiceL.updateMyNotificationSetting(this.userNotficationSettingForm.value).subscribe(res => {
        //console.log(res);
      });
    }else{
      this.appServiceL.addMyNotificationSetting(this.userNotficationSettingForm.value).subscribe(res => {
        //console.log(res);
      });
    }    

  }

}
