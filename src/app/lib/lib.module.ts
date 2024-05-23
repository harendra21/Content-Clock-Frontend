import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadMediaComponent } from './components/upload-media/upload-media.component';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { AiContentComponent } from './components/ai-content/ai-content.component';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule } from '@angular/forms';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { HttpClientModule } from '@angular/common/http';
import { CalendarComponent } from './components/calendar/calendar.component';
import { NzPopoverModule } from 'ng-zorro-antd/popover';

@NgModule({
  declarations: [
    UploadMediaComponent,
    AiContentComponent,
    CalendarComponent
  ],
  imports: [
    CommonModule,
    NzUploadModule,
    NzIconModule,
    NzInputModule,
    FormsModule,
    NzSpinModule,
    NzSpaceModule,
    NzButtonModule,
    HttpClientModule,
    NzPopoverModule
  ], 
  exports: [
    UploadMediaComponent,
    AiContentComponent,
    CalendarComponent
  ]
})
export class LibModule { }
