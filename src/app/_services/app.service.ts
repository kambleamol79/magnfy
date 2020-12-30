import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AlertService } from '../_services';

@Injectable({ providedIn: 'root' })
export class AppService {

    constructor(
        private http: HttpClient,
        private alertService: AlertService
    ) {}

    addInterest(data) {
        let body = data;
        return this.http.post(`${environment.apiUrl}/add_interest`, body)
            .pipe(
            map((res: any) => {
                this.alertService.success(res['message']);
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

    getMyInterest() {
        return this.http.get(`${environment.apiUrl}/get_interest`)
            .pipe(
            map((res: any) => {
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

    getInterestSocialDataByAuth() {
        return this.http.get(`${environment.apiUrl}/get_interest_social_data`)
            .pipe(
            map((res: any) => {
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

    getMyProfile() {
        return this.http.get(`${environment.apiUrl}/get_my_profile`)
            .pipe(
            map((res: any) => {
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

    getMySocialAccounts() {
        return this.http.get(`${environment.apiUrl}/get_my_social_accounts`)
            .pipe(
            map((res: any) => {
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

    updateUserProfile(data) {
        let body = data;
        return this.http.post(`${environment.apiUrl}/update_my_profile`, body)
            .pipe(
            map((res: any) => {
                this.alertService.success(res['message']);
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

    updateProfileImage(data) {
        let body = data;
        return this.http.post(`${environment.apiUrl}/update_profile_image`, body)
            .pipe(
            map((res: any) => {
                this.alertService.success(res['message']);
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

    getArticles() {
        return this.http.get(`${environment.apiUrl}/get_articles`)
            .pipe(
            map((res: any) => {
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


    getTrendingUers() {
        return this.http.get(`${environment.apiUrl}/get_trending_users`)
            .pipe(
            map((res: any) => {
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

    getAllUsers() {
        return this.http.get(`${environment.apiUrl}/get_all_users`)
            .pipe(
            map((res: any) => {
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

    addMySocialAccounts(data) {
        let body = data;
        return this.http.post(`${environment.apiUrl}/add_social_accounts`, body)
            .pipe(
            map((res: any) => {
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

    updateSocialAccounts(data) {
        let body = data;
        return this.http.post(`${environment.apiUrl}/update_social_accounts`, body)
            .pipe(
            map((res: any) => {
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

    getMySortingMethods() {
        return this.http.get(`${environment.apiUrl}/get_my_sorting_methods`)
            .pipe(
            map((res: any) => {
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

    addMySortingMethods(data) {
        let body = data;
        return this.http.post(`${environment.apiUrl}/add_sorting_methods`, body)
            .pipe(
            map((res: any) => {
                this.alertService.success(res['message']);
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

    updateMySortingMethods(data) {
        let body = data;
        return this.http.post(`${environment.apiUrl}/update_sorting_methods`, body)
            .pipe(
            map((res: any) => {
                this.alertService.success(res['message']);
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

    getMyNotificationSetting() {
        return this.http.get(`${environment.apiUrl}/get_my_notification_setting`)
            .pipe(
            map((res: any) => {
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

    addMyNotificationSetting(data) {
        let body = data;
        return this.http.post(`${environment.apiUrl}/add_notification_setting`, body)
            .pipe(
            map((res: any) => {
                this.alertService.success(res['message']);
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

    updateMyNotificationSetting(data) {
        let body = data;
        return this.http.post(`${environment.apiUrl}/update_notification_setting`, body)
            .pipe(
            map((res: any) => {
                this.alertService.success(res['message']);
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


    getInterestBySearch(data) {
        let body = data;
        return this.http.post(`${environment.apiUrl}/get_user_by_search`, body)
            .pipe(
            map((res: any) => {
                //this.alertService.success(res['message']);
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

    addInterestRequest(data) {
        let body = data;
        return this.http.post(`${environment.apiUrl}/add_interest_request`, body)
            .pipe(
            map((res: any) => {
                this.alertService.success(res['message']);
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

    getHelpPageData() {
        return this.http.get(`${environment.apiUrl}/get_help_page_contents`)
            .pipe(
            map((res: any) => {
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


    getAllSocialPosts() {
        return this.http.get(`${environment.apiUrl}/get_my_social_posts`)
            .pipe(
            map((res: any) => {
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

    addSocialPost(data) {
        let body = data;
        return this.http.post(`${environment.apiUrl}/add_social_posts`, body)
            .pipe(
            map((res: any) => {
                this.alertService.success(res['message']);
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

    deletePost(id) {
        return this.http.delete(`${environment.apiUrl}/magnfy_post/${id}`)
            .pipe(
            map((res: any) => {
                this.alertService.success(res['message']);
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



}