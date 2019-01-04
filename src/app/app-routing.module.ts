import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/routes/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { StarterAppComponent } from './components/routes/starter-app/starter-app.component';
import { HomeComponent } from './components/routes/home/home.component';
import { CaseComponent } from './components/routes/case/case.component';
import { AppConfig } from './models/liveappsdata';
import { ConfigResolver } from './resolvers/config.resolver';
import { CaseGuard } from './guards/case.guard';
import {ClaimsResolver} from './resolvers/claims.resolver';

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
      },
      {
        path: 'case/:caseRef',
        component: CaseComponent,
        canActivate: [AuthGuard, CaseGuard],
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
    CaseGuard,
    ConfigResolver,
    ClaimsResolver
    ]
})

export class AppRoutingModule { }
