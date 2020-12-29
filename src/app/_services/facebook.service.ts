import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FacebookService {

  constructor(private http: HttpClient,) { }

  getFacebookPosts(token: string){
    return this.http.get<any>(`${environment.facebookGraphUrl}/me/feed?fields=full_picture,message,created_time&access_token=${token}`);
  }

  getFacebookProfile(token: string){
    return this.http.get<any>(`${environment.facebookGraphUrl}/me?fields=picture,name&access_token=${token}`);
  }

  getFacebookLongLivedToken(token: string){
    return this.http.get<any>(`${environment.facebookGraphUrl}/oauth/access_token?grant_type=fb_exchange_token&client_id=3340960216001024&client_secret=60825d883e9ffd767b309b02b6f5ebaa&fb_exchange_token=${token}`);
  }

  getInstgramAccessToken(code: any){
    let body = new HttpParams()
    .set("client_id" , "1004935099970583")
    .set("client_secret","20c630bc9228211366047b4e4a5d1ed5")
    .set("code",code)
    .set("grant_type","authorization_code")
    .set("redirect_uri","https://server.ashoresystems.com/~magnfy/frontend/");

    const requestOptions = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    }

    return this.http.post<any>(`https://api.instagram.com/oauth/access_token`, body.toString(), requestOptions).pipe(
      map((res: any) => {
          //console.log(res);
          return res;            
      }),
      catchError((err) => {            
          console.log(err);
          return throwError(err);
      }));
  }
  
  instgramLongLivedToken(token: any){
    return this.http.get<any>(`https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret=20c630bc9228211366047b4e4a5d1ed5&&access_token=${token}`);
  }

  getInstgramPosts(token: any){
    return this.http.get<any>(`https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp,username&access_token=${token}`);
  }

  getInstgramMorePosts(url: any){
    return this.http.get<any>(url);
  }

  linkedin(){
    return this.http.get<any>(`https://www.linkedin.com/oauth/v2/authorization?response_type=code&state=123456&scope=r_liteprofile&client_id=86ava5m6hdf0pz&redirect_uri=https%3A%2F%2Flocalhost%3A4200%2F`);
  }
}
