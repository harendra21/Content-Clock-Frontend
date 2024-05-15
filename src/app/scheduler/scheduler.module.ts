import { NgModule } from '@angular/core';
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

@NgModule({
  declarations: [
    AddComponent,
    TwitterCardComponent,
    FacebookCardComponent,
    InstagramCardComponent,
    LinkedinCardComponent,
    ViewComponent,
    PreviewComponent
  ],
  imports: [
    CommonModule,
    SchedulerRoutingModule,
    AntModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    FacebookCardComponent,
    TwitterCardComponent,
    InstagramCardComponent,
    LinkedinCardComponent
  ]
})
export class SchedulerModule { }
