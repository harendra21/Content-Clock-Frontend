import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ApiService } from 'src/app/auth/service/api.service';

@Component({
  selector: 'add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.css'],
})
export class AddNewComponent implements OnInit {
  @Input() connection: any;
  @Input() slot: any;
  @Input() postId: number = 0;

  public postContent = '';
  public link = '';
  public title = '';
  public date = new Date();
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
    if (this.slot) {
      this.date = this.slot;
    }

    if (this.postId > 0) {
      this.loading = true;
      this.apiService.getRequest(`/social-post/${this.postId}`).subscribe(
        (res: any) => {
          this.loading = false;
          if (res.status) {
            const postData = res.data;
            this.postContent = postData.Description;
            this.link = postData.Link;
            this.title = postData.Title;
            this.date = postData.PublishAt;
            this.images =
              postData.Medias != '' ? postData.Medias.split(',') : [];

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
          this.loading = false;
          this.msg.error(err.error.message);
        },
      );
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

  clean(paragraph: string) {
    const regex = /^"|"$/g;
    // Replace leading quotes with an empty string
    return paragraph.replace('  ', '').replace(regex, '');
  }

  schedulePost(isDraft: boolean = false) {
    let body = {
      post_id: this.postId,
      connection_id: this.connection.ConnectionId,
      description: this.postContent,
      image: this.images.join(','),
      link: this.link,
      publish_at: this.date,
      title: this.title,
      type: 'post',
      status: 'scheduled',
    };
    if (isDraft) {
      body.status = 'draft';
    }

    this.apiService.postRequest(`/social-posts`, body).subscribe((res: any) => {
      if (res.status) {
        this.router.navigate([`/post/create/${this.connection.ConnectionId}`], {
          queryParams: { action: 'view' },
        });
      }
    });
  }

  uploadedFiles(files: any[]) {
    this.images = files;
  }

  generatedContent(content: string) {
    this.postContent = content;
    this.isVisible = false;
  }
}
