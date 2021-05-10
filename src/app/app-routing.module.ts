import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UsersComponent } from './components/users/users.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { ProfileComponent } from './components/profile/profile.component';
import { InterestComponent } from './components/interest/interest.component';
import { AuthGuard } from './_helpers';
import { CommonModule } from "@angular/common";
import { HelpComponent } from './components/help/help.component';
import { SettingComponent } from './components/setting/setting.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'dashboard', pathMatch: 'full'
  },
  {
    path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]
  },
  {
    path: 'signin', component: SigninComponent
  },
  {
    path: 'signup', component: SignupComponent
  },
  {
    path: 'forgot-password', component: ForgotPasswordComponent
  },
  {
    path: 'reset-password', component: ResetPasswordComponent
  },
  {
    path: 'magnfy', component: UsersComponent, canActivate: [AuthGuard]
  },
  {
    path: 'interest', component: InterestComponent, canActivate: [AuthGuard]
  },
  {
    path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]
  },
  {
    path: 'help', component: HelpComponent, canActivate: [AuthGuard]
  },
  {
    path: 'setting', component: SettingComponent, canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
