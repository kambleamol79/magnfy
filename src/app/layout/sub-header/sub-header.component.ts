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
  constructor(private appService: AppService, private authService: AuthService, private cookieService: CookieService) { }

  ngOnInit(): void {
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

}
