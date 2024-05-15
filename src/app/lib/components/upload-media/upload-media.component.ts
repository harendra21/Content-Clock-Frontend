import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApiService } from 'src/app/auth/service/api.service';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable, Observer } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-upload-media',
  templateUrl: './upload-media.component.html',
  styleUrls: ['./upload-media.component.css']
})
export class UploadMediaComponent implements OnInit {

  public uploadUrl = `${environment.v1Api}/file-upload`;;
  @Input() files: NzUploadFile[] = [];
  public filePaths: any[] = [];
  @Output() uploadedFiles = new EventEmitter<any[]>();

  public accessToken = this.apiService.getAccessToken();
  public headers: object = {
    Authorization: `Bearer ${this.accessToken}`,
  };


  constructor(
    private apiService: ApiService,
    private msg: NzMessageService,
  ) { }

  ngOnInit() {
  }

  beforeUpload = (
    file: NzUploadFile,
    _fileList: NzUploadFile[],
  ): Observable<boolean> =>
    new Observable((observer: Observer<boolean>) => {
      const isJpgOrPng =
        file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'video/mp4';
      if (!isJpgOrPng) {
        this.msg.error('You can only upload Images (jpg, png) and videos (mp4) file!');
        observer.complete();
        return;
      }
      const isWithinSize = file.size! / 1024 / 1024 < 100;
      if (!isWithinSize) {
        this.msg.error('Image must smaller than 100MB!');
        observer.complete();
        return;
      }
      observer.next(isJpgOrPng && isWithinSize);
      observer.complete();
    });

  handleChange(info: { file: NzUploadFile }): void {
    switch (info.file.status) {
      case 'uploading':
        // this.msg.info('Uploading...');
        break;
      case 'done':
        var res = info.file.response;

        if (res.status) {
          this.msg.success(res.message);
          let path = res.data.path;
          this.filePaths.push(path);
          this.uploadedFiles.emit(this.filePaths);
        } else {
          this.msg.error(res.message);
        }

        break;
      case 'error':
        this.msg.error('Network error');
        break;
      case 'removed':
        var file = info.file.response.data.path;
        let index = this.filePaths.indexOf(file);
        if (index !== -1) {
          this.filePaths.splice(index, 1);
        }
        this.uploadedFiles.emit(this.filePaths);
        break;
    }
  }

}