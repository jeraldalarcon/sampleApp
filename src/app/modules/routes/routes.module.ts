import { FollowersComponent } from './../../components/followers/followers.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../../components/home/home.component';
import { LoginComponent } from '../../components/login/login.component';
import { PageNotFoundComponentComponent } from '../../components/page-not-found-component/page-not-found-component.component';
import { ListComponent , listDialogComponent } from '../../components/list/list.component';
import { RegisterComponent } from '../../components/register/register.component';
import { AuthGuard } from '../../guards/auth.guard';
import { ProfileComponent } from '../../components/profile/profile.component';

// const appRoutes: Routes = [
//   { path: 'home', component:  HomeComponent ,canActivate: [AuthGuard]},
//   { path: 'login',      component: LoginComponent },
//   { path: 'list',      component: ListComponent ,canActivate: [AuthGuard]},
//   { path: 'register', component: RegisterComponent },
//   { path: 'profile', component:  ProfileComponent ,canActivate: [AuthGuard]},
//   { path: '',
//     redirectTo: 'home',
//     pathMatch: 'full'
//   },
//   { path: '**', component: PageNotFoundComponentComponent }
// ];

const appRoutes: Routes = [
  { path: 'home', component:  HomeComponent },
  { path: 'login',      component: LoginComponent },
  { path: 'list',      component: ListComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component:  ProfileComponent },
  { path: 'followers', component:  FollowersComponent },
  { path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponentComponent }
];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ]
})
export class RoutesModule { }
