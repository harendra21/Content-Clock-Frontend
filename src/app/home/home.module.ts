import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { GoogleChartsModule } from 'angular-google-charts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzCalendarModule } from 'ng-zorro-antd/calendar';
import { LibModule } from '../lib/lib.module';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    GoogleChartsModule,
    FormsModule,
    ReactiveFormsModule,
    NzCalendarModule,
    LibModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class HomeModule { }
