import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AntModule } from 'src/app/ant.module';
import { PostRoutingModule } from './post-routing.module';
import { CreateComponent } from './create/create.component';
import { FormsModule } from '@angular/forms';
import { SchedulerModule } from '../scheduler/scheduler.module';
import { LibModule } from '../lib/lib.module';
import { ScheduledComponent } from './scheduled/scheduled.component';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';
import { PublishedComponent } from './published/published.component';
import { DraftComponent } from './draft/draft.component';
import { AddNewComponent } from './add-new/add-new.component';
import { QueueComponent } from './queue/queue.component';

@NgModule({
  declarations: [
    CreateComponent,
    ScheduledComponent,
    PublishedComponent,
    DraftComponent,
    AddNewComponent,
    QueueComponent
  ],
  imports: [
    CommonModule,
    PostRoutingModule,
    AntModule,
    FormsModule,
    SchedulerModule,
    LibModule,
    NzTimelineModule
  ],
})
export class PostModule { }
