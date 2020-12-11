import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { User } from '../_models';
import { AlertService } from '../_services';

import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";

@Injectable({ providedIn: 'root' })
export class AuthService {

    private authSubject: BehaviorSubject<any>;
    public auth: Observable<any>;

    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;

    constructor(
        private router: Router,
        private http: HttpClient,
        public afAuth: AngularFireAuth, 
        private alertService: AlertService
    ) {
       
        this.authSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('auth')));
        this.auth = this.authSubject.asObservable();

        this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
        this.user = this.userSubject.asObservable();
    }

    public get authValue(): any {
        return this.authSubject.value;
    }

    public get userValue(): any {
        return this.userSubject.value;
    }

    
     // Sign in with Twitter
     TwitterAuth() {
        return this.AuthLogin(new auth.TwitterAuthProvider());
    }  

    // Auth logic to run auth providers
    AuthLogin(provider) {
        return this.afAuth.signInWithPopup(provider)
        .then((result) => {
            //console.log(result)
            localStorage.setItem('twitter_screen_name', result['additionalUserInfo']['profile']['screen_name']);
            localStorage.setItem('twitter_id', result['additionalUserInfo']['profile']['id']);
            console.log('You have been successfully logged in!')
        }).catch((error) => {
            console.log(error)
        })
    }
    
    login(username, password) {
        let body = { username: username, password: password, grant_type: environment.grant_type, client_id: environment.client_id, client_secret: environment.client_secret}
        return this.http.post(`${environment.oauthUrl}/token`, body)
            .pipe(
            map((res: any) => {
                localStorage.setItem('auth', JSON.stringify(res));
                this.authSubject.next(res);
                return res;            
            }),
            catchError((err) => {            
                console.log(err);   
                this.alertService.clear();      
                this.alertService.error(err);      
                const error = err.error?.message || err.statusText;
                return throwError(error);
            }));
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('auth');
        this.authSubject.next(null);
        this.router.navigate(['/signin']);
    }

    register(user: User) {
        //const header  = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded'});
        //let body = 'name='+user.name+'&email='+user.email+'&mobile='+user.phone+'&password='+user.password+'&confirm_password='+user.password_confirmation;
        return this.http.post(`${environment.apiUrl}/register`, user).pipe(
            map(res => {
            
            if(res['status'] == true){
                this.alertService.success(res['message']);
                return res;
            }else{
                this.alertService.clear();
                for (let key of Object.keys(res['data'])) {  
                  this.alertService.error(res['data'][key]);
                }
            }   
        }));
    }

    getById(id: string) {
        return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
    }

    getFacebookPosts(token: string){
        return this.http.get<User>(`https://graph.facebook.com/v8.0/me/feed?access_token=${token}`);
    }

    loginWithTwitter(){
        const headers = new HttpHeaders({});
      return this.http.post(`${environment.apiUrl}/twit_authorize`, {headers:headers});
    }

    getTwits(token, userName, id){
        return this.http.post(`${environment.apiUrl}/twit_get_posts`, {'twit_token' :token, 'screen_name': userName, 'twit_id': id});
    }

    getFollowers(token){
      return this.http.post(`${environment.apiUrl}/twit_get_followers`, {'twit_token' :token});
    }

    addInterest(data) {
        let body = data;
        return this.http.post(`${environment.apiUrl}/add_interest`, body)
            .pipe(
            map((res: any) => {
                console.log(res);
                return res;            
            }),
            catchError((err) => {            
                console.log(err);   
                this.alertService.clear();      
                this.alertService.error(err);      
                const error = err.error?.message || err.statusText;
                return throwError(error);
            }));
    }

    /*$http.get("https://graph.facebook.com/v2.8/me/feed&quot;, { params: { access_token: $scope.facebookKey, format: "json" }})

 "https://graph.facebook.com/v8.0/me/feed?access_token=EAADgpZAP4Ff0BANwaIoDfcZCAMTZAbCFDDhIaA1NZB5tvbdcv4IU0esqQG7vPpT6LSAkRFJsjh2kHzrGHQTNWvZAxGB5O7XlmCKruI1r3qBZBxfNs02fhGRRfNtckMoHkhGOkj58KN2mBb8bXNgaeGZBY7OAHWwV6rey3MVbLWlc4StxWJlZAJt06ffH9np22v1OdRpOaTq09QZDZD"*/

}