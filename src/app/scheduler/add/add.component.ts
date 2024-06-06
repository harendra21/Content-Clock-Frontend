import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApiService } from './../../services/api.service';
import { AiService } from 'src/app/services/ai.service';
import { environment } from 'src/environments/environment';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
import { Modal } from 'flowbite';
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
  public env = environment;
  @ViewChild('aimodalcontainer') aiModalElement!: ElementRef;

  constructor(
    private apiService: ApiService,
    private msg: NzMessageService,
    private ai: AiService,
    private router: Router
  ) { }

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
  connectionToggle(item: any) {

    const index = this.selectedConnections.indexOf(item);
    if (index == -1) {
      this.selectedConnections.push(item);
    } else {

      if (index > -1) {
        this.selectedConnections.splice(index, 1);
      }
    }

    this.isSelected(item)

  }

  isSelected(item: any) {
    const index = this.selectedConnections.indexOf(item);
    if (index == -1) {
      return false
    } else {
      return true
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
  writeAi() {
    if (this.aiText == "") { this.msg.error("Enter keyword to genrate the content with AI"); return }
    this.loadingAi = true;
    this.ai.askAi(this.aiText, "Social").subscribe((data: any) => {
      if (data.choices[0].message.content != '') {
        this.aiPost = this.clean(data.choices[0].message.content)
      } else {
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

  schedulePost(isDraft: boolean = false) {
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
      const connectionId = connection.ConnectionId

      let body = {
        post_id: 0,
        connection_id: connectionId,
        description: this.postContent,
        image: this.images.join(','),
        link: "",
        publish_at: this.postDate,
        title: "",
        type: 'post',
        status: 'scheduled',
      };
      if (isDraft) {
        body.status = 'draft';
      }

      this.apiService.postRequest(`/social-posts`, body).subscribe((res: any) => {
        if (res.status) {
          this.msg.success("Post added")
        } else {
          this.msg.success(res.message)
        }
      }, err => {
        this.msg.success(err.message)
      });

    });


  }
  public images: any[] = [];
  uploadedFiles(files: any) {
    this.images = files;
  }

  generatedContent(content: any) {
    this.postContent = content;
    this.closeAiModal();
  }

  ngAfterViewInit(): void {
    this.aiModal = new Modal(this.aiModalElement.nativeElement);
  }
  showAiModal(): void {
    this.isAi = true;
    this.aiModal.show();
  }

  public isAi = false;
  public aiModal!: Modal;
  closeAiModal(): void {
    this.isAi = false;
    this.aiModal.hide();
  }

}
