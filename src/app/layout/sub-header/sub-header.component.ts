import { Component, OnInit } from '@angular/core';
import { AuthService, AppService } from '../../_services';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-sub-header',
  templateUrl: './sub-header.component.html',
  styleUrls: ['./sub-header.component.css']
})
export class SubHeaderComponent implements OnInit {

  imageUrl: any;
  user: any;
  searchedUser: any = [];
  allSearchedResult: any = [];
  showall: boolean = false;
  showResult: boolean = false;

  constructor(private appService: AppService, private authService: AuthService, private cookieService: CookieService) { }

  ngOnInit(): void {
    this.searchedUser = [];
    this.appService.getMyProfile().subscribe(res => {
      if(res['status'] == true){
        this.user = res['data']['data'];
        this.imageUrl = environment.serverUrl + 'files/' + this.user['image'];
      }
    });
  }

  onLogout(){
    this.authService.logout();
    this.cookieService.deleteAll();
  }

  search(event: any){ 
    
    let input = event.target.value;
    if(input == ''){
      this.searchedUser = [];
      return;
    }
    if(input.length % 3 == 0){
      //Request body
      let data = { 'name': input, 'email': input };
      this.appService.getInterestBySearch(data).subscribe(res => {
        if(res['status']){
          this.searchedUser = [];
          this.searchedUser = res['data']['result'].slice(0, 6);
          this.allSearchedResult = res['data']['result'];
          this.showResult = true;
        }
      });
    }

  }

  closeSearch(event: any){
    this.searchedUser = [];
  }

  showAll(event: any){
    this.searchedUser = [];
    this.searchedUser = [ ...this.allSearchedResult ];
    this.showall = true;
  }

  addInterest(user){
    this.appService.addInterestRequest(user).subscribe(res => {
      this.searchedUser = [];
      console.log(res);
    });
  }

  focusout(event: any){
    console.log(event);
    this.showResult = false;
    this.showall = false;
  }


}
