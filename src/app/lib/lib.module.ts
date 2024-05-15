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

@NgModule({
  declarations: [
    UploadMediaComponent,
    AiContentComponent
  ],
  imports: [
    CommonModule,
    NzUploadModule,
    NzIconModule,
    NzInputModule,
    FormsModule,
    NzSpinModule,
    NzSpaceModule,
    NzButtonModule
  ], 
  exports: [
    UploadMediaComponent,
    AiContentComponent
  ]
})
export class LibModule { }
