import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AntModule } from '../ant.module';
import { SchedulerRoutingModule } from './scheduler-routing.module';
import { AddComponent } from './add/add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TwitterCardComponent } from './twitter-card/twitter-card.component';
import { FacebookCardComponent } from './facebook-card/facebook-card.component';
import { InstagramCardComponent } from './instagram-card/instagram-card.component';
import { LinkedinCardComponent } from './linkedin-card/linkedin-card.component';
import { ViewComponent } from './view/view.component';
import { PreviewComponent } from './preview/preview.component';
import { PinterestCardComponent } from './pinterest-card/pinterest-card.component';
import { LibModule } from '../lib/lib.module';
@NgModule({
  declarations: [
    AddComponent,
    TwitterCardComponent,
    FacebookCardComponent,
    InstagramCardComponent,
    LinkedinCardComponent,
    ViewComponent,
    PreviewComponent,
    PinterestCardComponent,
  ],
  imports: [
    SchedulerRoutingModule,
    AntModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    LibModule
  ],
  exports: [
    FacebookCardComponent,
    TwitterCardComponent,
    InstagramCardComponent,
    LinkedinCardComponent,
    PinterestCardComponent
  ],
  // schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SchedulerModule { }
