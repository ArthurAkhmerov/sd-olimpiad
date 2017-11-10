import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { FirstPageComponent } from './first-page/first-page.component';
import { MainPageComponent } from './main-page/main-page.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { DomainsService } from './services/domains.service';
import { MainPageRouteActivator } from './main-page/main-page-route-activator.service'

@NgModule({
  declarations: [
    AppComponent,
    FirstPageComponent,
    MainPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [DomainsService, MainPageRouteActivator],
  bootstrap: [AppComponent]
})
export class AppModule { }
