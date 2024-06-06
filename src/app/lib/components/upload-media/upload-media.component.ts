import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApiService } from './../../../services/api.service';
import { NzUploadFile, NzUploadXHRArgs } from 'ng-zorro-antd/upload';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable, Observer, Subscription } from 'rxjs';
import {
  HttpClient,
  HttpEventType,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';

@Component({
  selector: 'app-upload-media',
  templateUrl: './upload-media.component.html',
  styleUrls: ['./upload-media.component.css'],
})
export class UploadMediaComponent implements OnInit {
  public uploadUrl = '';
  @Input() files: NzUploadFile[] = [];
  @Input() filePaths: any[] = [];
  @Output() uploadedFiles = new EventEmitter<any[]>();

  public accessToken = this.apiService.getAccessToken();
  public headers: object = {
    'Content-Type': `application/octet-stream`,
  };

  constructor(
    private apiService: ApiService,
    private msg: NzMessageService,
    private http: HttpClient,
  ) { }

  ngOnInit() {
    setTimeout(() => {
      if (this.files.length > 0) {
        this.filePaths = this.files.map((file: NzUploadFile) => file.url);
      }
    }, 1000);
  }

  getSignedUrl(fileName: string, fileType: string) {
    var data: HttpParams = new HttpParams();
    data = data.append('filename', fileName);
    data = data.append('type', fileType);

    return this.apiService.getRequest(`/google-storage-signed-url`, true, data);
  }

  beforeUpload = (
    file: NzUploadFile,
    _fileList: NzUploadFile[],
  ): Observable<boolean> =>
    new Observable((observer: Observer<boolean>) => {
      const isJpgOrPng =
        file.type === 'image/jpeg' ||
        file.type === 'image/png' ||
        file.type === 'video/mp4';
      if (!isJpgOrPng) {
        this.msg.error(
          'You can only upload Images (jpg, png) and videos (mp4) file!',
        );
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
        // var res = info.file.response;

        // if (res.status) {
        //   this.msg.success(res.message);
        //   let path = res.data.path;
        //   this.filePaths.push(path);
        //   this.uploadedFiles.emit(this.filePaths);
        // } else {
        //   this.msg.error(res.message);
        // }

        break;
      case 'error':
        this.msg.error('Network error');
        break;
      case 'removed':
        var file: any;
        if (info.file.response) {
          file = info.file.response.data.path;
        } else {
          file = info.file.url;
        }
        this.filePaths = this.filePaths.filter((filePath) => filePath !== file);
        this.uploadedFiles.emit(this.filePaths);
        break;
    }
  }

  getRandomId() {
    // Generate a random 16-character string
    return Math.random().toString(36).substring(2, 18);
  }

  getFileExtension(filename: string) {
    // Get the file extension by splitting the filename by '.'
    return filename.split('.').pop();
  }

  generateRandomFilename(fileName: string) {
    // 
    const fileExtension = this.getFileExtension(fileName);
    const randomId = this.getRandomId();
    const newFileName = `${randomId}.${fileExtension}`;

    return newFileName;
  }

  customUploadReq = (item: NzUploadXHRArgs): Subscription => {
    var fileName = this.generateRandomFilename(item.file.name);
    var filePath = `social/uploads/` + fileName;
    let fileType: string = item.file.type || '';
    return this.getSignedUrl(filePath, fileType).subscribe(
      (res: any) => {
        if (res.status) {
          this.uploadUrl = res.data.url;
          const formData = new FormData();
          formData.append('files', item.file as any);

          const headers = new HttpHeaders({
            'Content-Type': fileType,
          });

          return this.http
            .put(res.data.url, item.file, {
              headers: headers,
              reportProgress: true,
              observe: 'events',
            })
            .subscribe(
              (event: any) => {
                if (event.type === HttpEventType.UploadProgress) {
                  if (event.total! > 0) {
                    (event as any).percent =
                      (event.loaded / event.total!) * 100;
                  }
                  if (item.onProgress) {
                    item.onProgress(event, item.file);
                  }
                } else if (event.type === HttpEventType.Response) {
                  if (item.onSuccess) {
                    this.msg.success('Upload success');
                    var path =
                      `https://storage.googleapis.com/with-code-example/` +
                      filePath;
                    this.filePaths.push(path);
                    this.uploadedFiles.emit(this.filePaths);
                    item.onSuccess(event.body, item.file, event);
                  }
                }
              },
              (err: any) => {
                if (item.onError) {
                  item.onError(err, item.file);
                }
              },
            );
        } else {
          if (item.onError) {
            this.msg.error(res.message);
            item.onError(res, item.file);
          }
        }
      },
      (err: any) => {
        if (item.onError) {
          this.msg.error(err.message);
          item.onError(err, item.file);
        }
      },
    );
  };
}
