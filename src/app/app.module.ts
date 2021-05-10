import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//import { LayoutModule } from './layout/layout.module';
import { HeaderComponent } from './layout/header/header.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { SubHeaderComponent } from './layout/sub-header/sub-header.component';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AlertComponent } from './components/alert/alert.component';
import { AuthService, AlertService, FacebookService, AppService } from './_services';

import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './components/profile/profile.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { FacebookLoginProvider } from 'angularx-social-login';
import { HelpComponent } from './components/help/help.component';

// Firebase services + enviorment module
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { ModalModule } from 'ngx-bootstrap/modal';
import { InterestComponent } from './components/interest/interest.component';
import { StringTrimPipe } from './_helpers/string-trim.pipe';
import { SettingComponent } from './components/setting/setting.component';
import { TwConvertDatePipe } from './_helpers/tw-convert-date.pipe';
import { ChartsModule } from 'ng2-charts';
import { NgImageFullscreenViewModule } from 'ng-image-fullscreen-view';
import { UsersComponent } from './components/users/users.component';
import { ImageViewerComponent } from './components/image-viewer/image-viewer.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';

import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    SubHeaderComponent,
    AlertComponent,
    SigninComponent,
    SignupComponent,
    ProfileComponent,
    DashboardComponent,
    HelpComponent,
    InterestComponent,
    StringTrimPipe,
    SettingComponent,
    UsersComponent,
    TwConvertDatePipe,
    ImageViewerComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
  ],
  imports: [   
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    SocialLoginModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    ChartsModule,
    NgImageFullscreenViewModule,
    ShareButtonsModule.withConfig({
      debug: false
    }),
    ShareIconsModule,
    ModalModule.forRoot(),
    
  ],
  providers: [ 
    AuthService, 
    AppService, 
    AlertService,
    FacebookService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('3340960216001024'),
          },
        ],
      } as SocialAuthServiceConfig,
    }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
