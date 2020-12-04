import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { SocialAuthService, FacebookLoginProvider } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import { FacebookService, AuthService, AppService } from '../../_services';
import Twitter from 'twitter-lite';
import { Router} from '@angular/router';
import { trimValidator } from '../../_helpers';
import { environment } from '../../../environments/environment';

const client = new Twitter({
  consumer_key: '2HwTfB9qBjWH0AN4bMsU28lbD',
  consumer_secret: '6AmYUBsdhhYAJzhf7huAzK3mewivWiImth5csohWBT0LHnW6c7',
});

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: SocialUser;
  userData: any;
  userSocialData: any;
  userDataForm: FormGroup;
  userAboutMeForm: FormGroup;
  userImageDataForm: FormGroup;
  /*userSocialDataForm: FormGroup;*/
  imageUrl: any;
  submitted1: boolean = false;

  constructor(
    private router: Router, 
    private socialAuthService: SocialAuthService, 
    private facebookService: FacebookService, 
    public authService: AuthService,
    public appServiceL: AppService,
    public fb: FormBuilder,
   private cd: ChangeDetectorRef
    ) { }

  ngOnInit(): void {

    this.userDataForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.pattern('^[_A-z0-9 ]*((-|\s)*[_A-z0-9 ])*$'), trimValidator],],
      username: ['', [Validators.required, trimValidator]],
      works_at: ['', [Validators.required, trimValidator]],
      city: ['', [Validators.required, trimValidator]],
    });

    this.userAboutMeForm = this.fb.group({
      about_me: ['', [Validators.required, trimValidator]],
    });

    /*this.userSocialDataForm = this.fb.group({      
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$'), trimValidator]],
      message: ['', [Validators.required, trimValidator]],
      subject: ['', [Validators.required, trimValidator]],      
    });*/

    this.userImageDataForm = this.fb.group({
      image:['']
    });

    this.getMyProfileData();
    this.getMySocialAccountsData();
   
  }

  getMyProfileData(){
    this.appServiceL.getMyProfile().subscribe(res => {
      
      if(res['status'] == true){
        this.userData = res['data']['data'];
        this.imageUrl = environment.serverUrl + 'files/' + this.userData['image'];
        this.userDataForm.controls['name'].patchValue(this.userData['name']);
        this.userDataForm.controls['username'].patchValue(this.userData['username']);
        this.userDataForm.controls['city'].patchValue(this.userData['city']);
        this.userDataForm.controls['works_at'].patchValue(this.userData['works_at']);
        this.userAboutMeForm.controls['about_me'].patchValue(this.userData['about_me']);
      }
    });
  }  

  getMySocialAccountsData(){
    this.appServiceL.getMySocialAccounts().subscribe(res => {
      //console.log(res);
      if(res['status'] == true){
        this.userSocialData = res['data'];
      }
      //console.log(this.userSocialData['data']);
    });

  }

  get f1() {
    return this.userDataForm.controls;
  }

  /*get f2() {
    return this.userSocialDataForm.controls;
  }*/

  updateMyProfile(){
    this.submitted1 = true;
    //console.log(this.userDataForm);
    if(this.userDataForm.invalid){
      return;
    }

    let data = { ...this.userDataForm.value, ...this.userAboutMeForm.value };
    this.appServiceL.updateUserProfile(data).subscribe(res => {
      //console.log(res);
      if(res['status'] == true){
        //this.userSocialData = res['data'];
      }
    });
  }

  fileUpload(event){
    let reader = new FileReader();
 
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
    
      reader.onload = () => {
        //console.log(reader.result);
          //this.userImageDataForm.controls['image'].patchValue(reader.result);
        // need to run CD since file load runs outside of zone
        let imageData = {
          image: reader.result
        };

        this.appServiceL.updateProfileImage(imageData).subscribe(res => {
          //console.log(res);
          if(res['status'] == true){
            //this.userSocialData = res['data'];
            //this.imageUrl = res['data']['imageName'];
            this.imageUrl = environment.serverUrl + 'files/' + res['data']['imageName'];

          }
        });
        
      };
    }
  }

  signInWithFB(): void {
    const fbLoginOptions = {
      scope: 'email,user_posts,instagram_basic,pages_show_list,pages_read_engagement,pages_manage_posts,public_profile',
      return_scopes: true,
      enable_profile_selector: true
    }; // https://developers.facebook.com/docs/reference/javascript/FB.login/v2.11

    let faceboobAccountDetails = {
      facebook_id : '',
      facebook_social_name : '',
      facebook_token : '',
      facebook_token_expiry_date : '',
    }
    
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID, fbLoginOptions).then(res=>{
      localStorage.setItem('facebook', JSON.stringify(res)); 
      faceboobAccountDetails['facebook_id'] = res['id'];
      faceboobAccountDetails['facebook_social_name'] = res['name'];
      this.facebookService.getFacebookLongLivedToken(res['authToken']).subscribe(accessTokenData => {
        localStorage.setItem('facebookAccessToken', accessTokenData['access_token']);
        faceboobAccountDetails['facebook_token'] = accessTokenData['access_token'];
        faceboobAccountDetails['facebook_token_expiry_date'] = accessTokenData['expires_in'];
        //this.router.navigate(['/dashboard']); 
        if(this.userSocialData['data'].length == 0){
          this.appServiceL.addMySocialAccounts(faceboobAccountDetails).subscribe(res => {
            console.log(res);
          });
        }else{
          this.appServiceL.updateSocialAccounts(faceboobAccountDetails).subscribe(res => {
            console.log(res);
          });
        }

        
      });  

      console.log(faceboobAccountDetails);
      
    }).catch((error: any) => console.error(error));
  }

  linkedIn(){
    this.facebookService.linkedin().subscribe(posts=>{
      console.log(posts);
    });
  }

  twitter(){
    let twitterAccountDetails = {
      twitter_social_name: '',
      twitter_token: '',
    }
    this.authService.TwitterAuth().then(res =>{
      twitterAccountDetails['twitter_social_name'] = localStorage.getItem('twitter_screen_name');
      this.authService.loginWithTwitter().subscribe(res => {
        console.log(res['data']['data']['access_token']);
        twitterAccountDetails['twitter_token'] = res['data']['data']['access_token'];
        if(this.userSocialData['data'].length == 0){
          this.appServiceL.addMySocialAccounts(twitterAccountDetails).subscribe(res => {
            console.log(res);
          });
        }else{
          this.appServiceL.updateSocialAccounts(twitterAccountDetails).subscribe(res => {
            console.log(res);
          });
        }
      });
     
      //this.router.navigate(['/dashboard']);
    }); 
  }

  signOut(): void {
    this.socialAuthService.signOut();
  }

}
