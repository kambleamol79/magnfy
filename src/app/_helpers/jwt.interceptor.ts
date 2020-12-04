import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { AuthService } from '../_services';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if user is logged in and request is to the api url
        const user = JSON.parse(localStorage.getItem('auth'));
        const isLoggedIn = user && user.access_token;
        const isApiUrl = request.url.startsWith(environment.apiUrl);
        if (isLoggedIn && isApiUrl) {
            request = request.clone({
                setHeaders: {
                    /*Authorization: `Bearer ${user.token}`*/
                    /*'Client_secret':`f0myjnnBLsviIfnSu1cyTcNWDGLRL0SNUlRV0bHl`,*/
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${user.access_token}`
                }
            });
        }else{
            request = request.clone({
                setHeaders: {
                    /*'Client_secret':`f0myjnnBLsviIfnSu1cyTcNWDGLRL0SNUlRV0bHl`,*/
                    'Accept': 'application/json',
                }
            });
        }

        return next.handle(request);
    }
}