import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AuthService } from '../_services';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) {}
    private readonly logoPartialUrl = 'helloWorld/logon'.toLowerCase();

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    //console.log('event--->>>', event);
                    //console.log(event);
                }
                const response = event as HttpResponseBase;
                //console.log(response)
                if (response && response.ok && response.url && response.url.toLowerCase().indexOf(this.logoPartialUrl) >= 0) {
                    const queryStringIndex = response.url.indexOf('?');
                    const loginUrl = queryStringIndex && queryStringIndex > 0 ? response.url.substring(0, queryStringIndex) : response.url;
                    console.log('User logout detected, redirecting to login page: %s', loginUrl);
                    
                }
                return event;
            }),
            catchError((err) => {
                
            if ([400, 401, 403].includes(err.status) && this.authService.authValue) {
                // auto logout if 401 or 403 response returned from api
                localStorage.clear();
                this.authService.logout();
            }else if([400, 401, 403].includes(err.status)){
                localStorage.clear();
                this.authService.logout();
                
            }else if([422].includes(err.status)){
                /*localStorage.clear();
                this.authService.logout();*/
                
            }else{
                window.open(err.url, 'popup', "width=500,height=500");
                console.log(err);
            }
            const error = err.error?.message || err.statusText;
            return throwError(error);
        }));
    }
}