import { NgModule } from '@angular/core';
import {Routes, RouterModule, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import {AuthGuard, TcSharedStateService} from 'tc-core-lib';
import { HomeComponent } from './components/home/home.component';
import { StarterAppComponent } from './components/starter-app/starter-app.component';
import { ConfigResolver } from 'tc-core-lib';
import {Claim, ClaimsResolver, LiveAppsService} from 'tc-liveapps-lib';
import {HttpClient} from '@angular/common/http';
import {share} from 'rxjs/operators';
import {LaConfigResolver} from '../../projects/tc-liveapps-lib/src/lib/resolvers/la-config.resolver';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    // starterApp route doesnt do anything but will be a useful place to do stuff that applies to all routes
    // note although each route uses claimsResolver this doesnt actually result in multiple REST call to claims
    // because we cache at http level using an interceptor
    path: 'starterApp',
    component: StarterAppComponent,
    canActivate: [AuthGuard],
    resolve: {
      claims: ClaimsResolver
    },
    children: [
      {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuard],
        resolve: {
          claims: ClaimsResolver,
          appConfig: LaConfigResolver
        }
      }
    ]
  },
  {
    path: '**', redirectTo: '/starterApp/home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    LoginComponent,
    HomeComponent,
    ClaimsResolver,
    ConfigResolver,
    LaConfigResolver
    ]
})

export class AppRoutingModule {
  }
