import {
  Component,
  Input,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
  EventEmitter,
  Output,

} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ApiService } from './../../services/api.service';
import { Modal } from 'flowbite';

@Component({
  selector: 'add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.css'],
})
export class AddNewComponent implements AfterViewInit, OnInit {
  @Input() connection: any;
  @Input() slot: any;
  @Input() postId: number = 0;
  @ViewChild('aimodalcontainer') aiModalElement!: ElementRef;
  @Output() createUpdatePost = new EventEmitter<boolean>();

  public postContent = '';
  public link = '';
  public title = '';
  public postDate: any;
  public filePaths: any = []

  public isVisible: boolean = false;
  public aiText: string = '';
  public files: any[] = [];
  public images: any[] = [];
  public loading: boolean = false;

  constructor(
    private msg: NzMessageService,
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    // const id = this.route.snapshot.queryParamMap.get('id');
  }

  ngOnInit() {
    this.apiService.addNewData.subscribe((res: any) => {
      this.postId = res.postId;
      this.slot = res.slot;
      this.connection = res.connection;
      this.reloadComponent(this.slot, this.postId);
    });
  }

  public aiModal!: Modal;

  ngAfterViewInit(): void {
    this.aiModal = new Modal(this.aiModalElement.nativeElement);
  }
  public isAi = false;
  showAiModal(): void {
    this.isAi = true;
    this.aiModal.show();
  }
  closeAiModal(): void {
    this.isAi = false;
    this.aiModal.hide();
  }

  clean(paragraph: string) {
    const regex = /^"|"$/g;
    // Replace leading quotes with an empty string
    return paragraph.replace('  ', '').replace(regex, '');
  }

  schedulePost(isDraft: boolean = false) {
    let body = {
      post_id: parseInt(this.postId.toString()),
      connection_id: this.connection.ConnectionId,
      description: this.postContent,
      image: this.images.join(','),
      link: this.link,
      publish_at: this.postDate,
      title: this.title,
      type: 'post',
      status: 'scheduled',
    };
    if (isDraft) {
      body.status = 'draft';
    }

    this.apiService.postRequest(`/social-posts`, body).subscribe((res: any) => {
      if (res.status) {
        this.createUpdatePost.emit(true);
        this.apiService.setDailyPostCount(this.connection.ConnectionId);
        this.apiService.setPostCount(this.connection.ConnectionId);
        this.msg.success(res.message);
      } else {
        this.msg.error(res.message);
      }
    }, err => {
      this.msg.error(err.message);
    });
  }

  uploadedFiles(files: any[]) {
    this.images = files;
  }

  generatedContent(content: string) {
    this.postContent = content;
    this.closeAiModal();
  }

  formatDate(date: Date) {
    date = new Date(date);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${this.addLeadingZero(month)}-${this.addLeadingZero(day)}`;
  }

  formatTime(date: Date) {
    date = new Date(date);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${this.addLeadingZero(hours)}:${this.addLeadingZero(minutes)}`;
  }
  addLeadingZero(value: any) {
    return String(value).padStart(2, '0');
  }

  reloadComponent(slot: any, postId: number) {
    this.postContent = '';
    this.link = '';
    this.title = '';
    this.postDate = '';
    this.images = [];
    this.files = [];
    this.loading = false;
    this.filePaths = []

    if (postId > 0) {
      this.apiService.getRequest(`/social-post/${postId}`).subscribe(
        (res: any) => {
          if (res.status) {
            const postData = res.data;
            this.postContent = postData.Description;
            this.link = postData.Link;
            this.title = postData.Title;
            this.postDate = postData.PublishAt;
            this.images =
              postData.Medias != '' ? postData.Medias.split(',') : [];
            this.filePaths = this.images
            if (this.images.length > 0) {
              var files: any[] = [];

              this.images.forEach((image: string, index: number) => {
                files.push({
                  uid: index,
                  status: 'done',
                  url: image,
                });
              });

              this.files = files;
            }
          } else {
            this.msg.error(res.message);
          }
        },
        (err) => {
          this.msg.error(err.error.message);
        },
      );
    } else {
      this.postDate = slot;
    }

  }
}
