import {TestBed, async, fakeAsync, tick} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import {TcCoreLibModule} from '../../projects/tibco-tcstk/tc-core-lib/src/lib/tc-core-lib.module';
import {TcLiveappsLibModule} from '../../projects/tibco-tcstk/tc-liveapps-lib/src/lib/tc-liveapps-lib.module';
import {TcFormsLibModule} from '../../projects/tibco-tcstk/tc-forms-lib/src/lib/tc-forms-lib.module';
import {AppRoutingModule} from './app-routing.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import {LoginComponent} from './routes/login/login.component';
import {ShowcaseComponent} from './routes/showcase/showcase.component';
import {StarterAppComponent} from './routes/starter-app/starter-app.component';
import {SettingsComponent} from './routes/settings/settings.component';
import {HomeComponent} from './routes/home/home.component';
import {ConfigurationComponent} from './routes/configuration/configuration.component';
import {CaseComponent} from './routes/case/case.component';
import {SplashComponent} from './routes/splash/splash.component';
import {LogService} from '@tibco-tcstk/tc-core-lib';
import { Location } from '@angular/common';
import {Router} from '@angular/router';
import {CORE_ROUTES} from './route-config/core-route-config';

describe('AppComponent', () => {

  let location: Location;
  let router: Router;
  let fixture;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppRoutingModule,
        TcCoreLibModule,
        TcFormsLibModule,
        TcLiveappsLibModule.forRoot(),
        FlexLayoutModule,
        BrowserModule,
        FormsModule,
        MatTabsModule,
        MatExpansionModule,
        MatButtonModule,
        MatCardModule,
        MatCheckboxModule,
        MatListModule,
        MatFormFieldModule,
        MatInputModule,
        MatToolbarModule,
        MatIconModule,
        MatSelectModule,
        MatOptionModule,
        MatDialogModule,
        MatMenuModule,
        MatCardModule,
        MatTooltipModule,
        MatTabsModule,
        MatButtonToggleModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes(CORE_ROUTES),
      ],
      declarations: [
        AppComponent,
        LoginComponent,
        StarterAppComponent,
        ShowcaseComponent,
        SettingsComponent,
        HomeComponent,
        ConfigurationComponent,
        CaseComponent,
        SplashComponent
      ],
      providers: [
        LogService
      ]
    });
    router = TestBed.get(Router);
    location = TestBed.get(Location);
    fixture = TestBed.createComponent(AppComponent);
    router.initialNavigation();
  }));

  /*it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });*/

  it('navigate to "" redirects you to /starterApp/home', fakeAsync(() => {
    router.navigate((['']));
    tick();
    expect(location.path()).toBe('/login?returnUrl=%2FstarterApp%2Fhome');
    }));

});
