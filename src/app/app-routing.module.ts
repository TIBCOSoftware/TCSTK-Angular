import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from 'tc-core-lib';
import { HomeComponent } from './components/home/home.component';
import { StarterAppComponent } from './components/starter-app/starter-app.component';
import { ConfigResolver } from 'tc-core-lib';
import { ClaimsResolver } from 'tc-liveapps-lib';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
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
          appConfig: ConfigResolver,
          claims: ClaimsResolver
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
    ConfigResolver,
    ClaimsResolver
    ]
})

export class AppRoutingModule { }
