import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { IconsProviderModule } from './icons-provider.module';
import { AntModule } from './ant.module';
import { NzConfig, NZ_CONFIG } from 'ng-zorro-antd/core/config';
import { RouteReuseStrategy } from '@angular/router';
import { CustomRouteReuseStrategy } from './custom-route-reuse-strategy';

const ngZorroConfig: NzConfig = {
  theme: {
    primaryColor: "#EF5350",
    infoColor: "#2196F3",
    successColor: "#4CAF50",
    processingColor: "#78909C",
    errorColor: "#D84315",
    warningColor: "#FDD835"
  }
};

registerLocaleData(en);
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({
      appId: 'my-app-id',
    }),
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    IconsProviderModule,
    AntModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    { provide: NZ_CONFIG, useValue:  ngZorroConfig },
    { provide: RouteReuseStrategy, useClass: CustomRouteReuseStrategy }
  ],
  bootstrap: [AppComponent],
  exports: [
  ]
})
export class AppModule { }
