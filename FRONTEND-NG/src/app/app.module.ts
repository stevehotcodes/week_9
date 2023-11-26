import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { NavigationComponent } from './navigation/navigation.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { NewproductComponent } from './newproduct/newproduct.component';
import { AdminAsideComponent } from './admin-aside/admin-aside.component';
import { AdminlandingComponent } from './adminlanding/adminlanding.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { UserNavigationComponent } from './user-navigation/user-navigation.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavigationComponent,
    RegistrationComponent,
    LoginComponent,
    NewproductComponent,
    AdminAsideComponent,
    AdminlandingComponent,
    LandingpageComponent,
    UserNavigationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
