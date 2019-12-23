import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CoreModule} from './core/core.module';
import {FooterComponent} from './footer/footer.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MAT_LABEL_GLOBAL_OPTIONS} from '@angular/material';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FlexLayoutModule} from '@angular/flex-layout';
import {TokenInterceptor} from "./shared/tokenInterceptor";

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
  ],
  imports: [
    // import nav bar
    CoreModule,
    // route root
    AppRoutingModule,
    // CSS flex plugin
    FlexLayoutModule,
    HttpClientModule,
    BrowserModule,
    // not used at this moment
    BrowserAnimationsModule,
  ],
  providers: [
    // global setting for float label
    {provide: MAT_LABEL_GLOBAL_OPTIONS, useValue: {float: 'auto'}},
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
