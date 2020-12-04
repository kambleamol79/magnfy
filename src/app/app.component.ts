import { Component } from '@angular/core';
import { AuthService } from './_services';
import { User, Auth } from './_models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'Magnfy';
  auth: Auth;

  constructor(private authService: AuthService){
    //sessionStorage.setItem('auth_token', 'login_token');
    //sessionStorage.removeItem('auth_token');
    this.authService.auth.subscribe(x => this.auth = x);
  }

  logout() {
    this.authService.logout();
  }

}
