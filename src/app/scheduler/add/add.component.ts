import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/auth/service/api.service';
import { AiService } from 'src/app/services/ai.service';
import { environment } from 'src/environments/environment';
import { Observable, Observer } from 'rxjs';

import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent implements OnInit {
  public connections: any[] = [];
  public selectedConnections: any[] = [];
  public postContent: string = '';
  public postDate: string = new Date().toISOString();
  public files: any[] = [];
  public filePaths: any[] = [];
  public uploadUrl: string = `${environment.v1Api}/file-upload`;
  public apiHost: string = environment.apiHost;
  public accessToken = this.apiService.getAccessToken();
  public headers: object = {
    Authorization: `Bearer ${this.accessToken}`,
  };
  public isVisible: boolean = false;
  public aiText: string = ""

  constructor(
    private apiService: ApiService,
    private msg: NzMessageService,
    private ai: AiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getConnections();
  }

  getConnections() {
    this.apiService.getRequest(`/connections`).subscribe((res: any) => {
      if (res.status) {
        this.connections = res.data.results;
      }
    });
  }
  connectionToggle(event: any) {
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
        break;
    }
  }

  showModal(): void {
    this.isVisible = true;
  }
  handleOk(): void {
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }
  public aiPost: string = ""
  public loadingAi: boolean = false;
  writeAi(){
    if(this.aiText == "") {this.msg.error("Enter keyword to genrate the content with AI"); return}
    this.loadingAi = true;
    this.ai.askAi(this.aiText, "Social").subscribe((data: any) => {
      if(data.choices[0].message.content != ''){
        this.aiPost = this.clean(data.choices[0].message.content)
      }else{
        this.msg.success("Something went wrong, Please try again")
      }
      this.loadingAi = false
    }, err => {
      this.loadingAi = false
      this.msg.error(err.message);
    })
  }

  clean(paragraph: string) {
    
    const regex = /^"|"$/g
    // Replace leading quotes with an empty string
    return paragraph.replace("  ", "").replace(regex, '');
}

  schedulePost(draft: boolean = false) {
    if (this.postContent == "") {
      this.msg.error("Enter post content"); return;
    }
    if (this.selectedConnections.length == 0) {
      this.msg.error("Select at least one connection"); return;
    }
    if (this.postDate == "") {
      this.msg.error("Enter post date"); return;
    }
    var connectionIds: any[] = [];
    this.selectedConnections.forEach((connection: any) => {
      connectionIds.push(connection.ConnectionId);
    });
    let PublishStatus = "scheduled"
    if(draft){
      PublishStatus = "draft"
    }
    
    
    var body = {
      "Title": "Post Scheduled",
      "Content": this.postContent,
      "ConnectionIds": connectionIds.join(","),
      "PublishAt": this.postDate,
      "Tags": "js",
      "Medias": this.filePaths.join(","),
      "PublishStatus": PublishStatus
    }

    this.apiService.postRequest(`/posts`, body).subscribe((res: any) => {
      if (res.status) {
        this.msg.success(res.message);
        this.router.navigate(['/scheduler/view']);
      } else {
        this.msg.error(res.message);
      }
    });
    
  }
}
