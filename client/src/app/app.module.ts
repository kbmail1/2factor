import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { HomeComponent } from './components/home/home.component';
import { HelloComponent } from './components/hello/hello.component';
import { HeaderComponent } from './components/header/header.component';
import { RestClientService } from './services/rest-client/rest-client.service';
import { LoginService } from './services/login/login.service';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StatusMessageService } from './services/statusMessage/statusMessage.service';
import { StatusMessageComponent } from './components/statusMessage/statusMessage.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    PagenotfoundComponent,
    HomeComponent,
    HelloComponent,
    HeaderComponent,
    LoginComponent,
    StatusMessageComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    RestClientService,
    LoginService,
    StatusMessageService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi:  true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
