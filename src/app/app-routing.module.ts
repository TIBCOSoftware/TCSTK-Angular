import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/routes/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { StarterAppComponent } from './components/routes/starter-app/starter-app.component';
import { HomeComponent } from './components/routes/home/home.component';
import {CaseComponent} from './components/routes/case/case.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'starterApp',
    component: StarterAppComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'case/:caseRef',
        component: CaseComponent,
        canActivate: [AuthGuard],
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
    LoginComponent
    ]
})

export class AppRoutingModule { }
