import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ApiService } from 'src/app/auth/service/api.service';

@Component({
  selector: 'app-ai-content',
  templateUrl: './ai-content.component.html',
  styleUrls: ['./ai-content.component.css'],
})
export class AiContentComponent implements OnInit {
  public aiText: string = '';
  public loading: boolean = false;
  public aiPosts: any[] = [];

  @Output() generatedContent = new EventEmitter<string>();

  constructor(
    private apiService: ApiService,
    private msg: NzMessageService,
  ) {}

  ngOnInit() {}

  writeAi() {
    if (this.aiText == '') {
      this.msg.error('Enter keyword to genrate the content with AI');
      return;
    }
    this.loading = true;
    this.apiService.getRequest(`/generate-ai-posts?topic=${this.aiText}`).subscribe((res: any) => {
      if (res.status){

        var data = JSON.parse(res.data);
        this.aiPosts = data.posts;

        this.loading = false;
      }else{
        this.msg.error(res.message);
        this.loading = false;
      }
    }, err => {
      this.msg.error(err.message);
      this.loading = false;
    })
  }

  clean(paragraph: string) {
    const regex = /^"|"$/g;
    // Replace leading quotes with an empty string
    return paragraph.replace('  ', '').replace(regex, '');
  }

  acceptContent(post: string) {
    this.msg.success('Content accepted');
    this.generatedContent.emit(post);
  }
}
