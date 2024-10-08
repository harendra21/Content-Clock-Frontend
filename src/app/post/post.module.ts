import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AntModule } from 'src/app/ant.module';
import { PostRoutingModule } from './post-routing.module';
import { CreateComponent } from './create/create.component';
import { FormsModule } from '@angular/forms';
import { SchedulerModule } from '../scheduler/scheduler.module';
import { LibModule } from '../lib/lib.module';
import { ScheduledComponent } from './scheduled/scheduled.component';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';
import { AddNewComponent } from './add-new/add-new.component';
import { QueueComponent } from './queue/queue.component';
import { NzCalendarModule } from 'ng-zorro-antd/calendar';
import { TweetComponent } from './preview/tweet/tweet.component';

@NgModule({
  declarations: [
    CreateComponent,
    ScheduledComponent,
    AddNewComponent,
    QueueComponent,
    TweetComponent,
  ],
  imports: [
    CommonModule,
    PostRoutingModule,
    AntModule,
    FormsModule,
    SchedulerModule,
    LibModule,
    NzTimelineModule,
    NzCalendarModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PostModule { }
