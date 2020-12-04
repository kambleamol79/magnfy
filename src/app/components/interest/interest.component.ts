import { Component, OnInit, TemplateRef  } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AppService } from '../../_services';
import { trimValidator } from '../../_helpers';

@Component({
  selector: 'app-interest',
  templateUrl: './interest.component.html',
  styleUrls: ['./interest.component.css']
})
export class InterestComponent implements OnInit {

  InterestForm1: FormGroup;
  InterestForm2: FormGroup;
  submitted1 = false;
  submitted2 = false;
  modalRef: BsModalRef;
  personInterests: any = [];
  businessInterests: any = [];
  showError: boolean = false;
  errorMessage: any;
  constructor(private modalService: BsModalService, public fb: FormBuilder, public _appService: AppService) {}

  ngOnInit(): void {
    this.getMyInterests();
    this.InterestForm1 = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.pattern('^[_A-z0-9 ]*((-|\s)*[_A-z0-9 ])*$'), trimValidator],],
      website: ['', [Validators.required, trimValidator]],
      industry: ['', [Validators.required, trimValidator]],
      city: ['', [Validators.required, trimValidator]],
      instagram_id: ['', [Validators.required, trimValidator]],
      facebook_id: ['', [Validators.required, trimValidator]],
      linkedin_id: ['none'],
      twitter_id: ['', [Validators.required, trimValidator]],
      signed_up: [0],
      
    });

    this.InterestForm2 = this.fb.group({      
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$'), trimValidator]],
      message: ['', [Validators.required, trimValidator]],
      subject: ['', [Validators.required, trimValidator]],
    });

  }

  getMyInterests(){
    this._appService.getMyInterest().subscribe(res => {
      //console.log(res);
      if(res.status == true){
        let interests: any = [] = res.data.result;
        this.personInterests = [];
        this.businessInterests = [];
        interests.filter((item) => {
          if(item.userType == 'Personal'){
            this.personInterests.push(item);
          }
          if(item.userType == 'Business'){
            this.businessInterests.push(item);
          }
        });
      }
      
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    this.onReset();
  }

  confirm(template: TemplateRef<any>) {
    this.submitted1 = true;
    if (this.InterestForm1.invalid) {
      return;
    }
    this.closeModal();
    setTimeout(() => {
      this.modalRef = this.modalService.show(template);
    }, 1000);
    
  }

  closeModal(modalId?: number){
    this.modalService.hide(modalId);
  }

  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
}

  get f1() {
    return this.InterestForm1.controls;
  }

  get f2() {
    return this.InterestForm2.controls;
  }

  onSubmit(): void {
    
    this.submitted2 = true;

    // stop here if form is invalid
    if (this.InterestForm2.invalid) {
      return;
    }

    let data = { ...this.InterestForm1.value, ...this.InterestForm2.value }

    this._appService.addInterest(data).subscribe(res => {
      console.log(res);
      if(res && res.data.status == false){
        this.showError= true;
        this.errorMessage= res.message;
      }else{
        data = {};
        this.onReset();
        this.closeModal();
        this.getMyInterests();
      }
      
    });

  }

  onReset() {
    this.submitted1 = false;
    this.submitted2 = false;
    this.InterestForm1.reset();
    this.InterestForm2.reset();
  }

  closeError(){
    this.showError = false;
  }


}
