import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AiService } from 'src/app/services/ai.service';

@Component({
  selector: 'app-ai-content',
  templateUrl: './ai-content.component.html',
  styleUrls: ['./ai-content.component.css'],
})
export class AiContentComponent implements OnInit {
  public aiText: string = '';
  public loading: boolean = false;
  public aiPost: string = '';

  @Output() generatedContent = new EventEmitter<string>();


  constructor(
    private aiService: AiService,
    private msg: NzMessageService,
  ) {}

  ngOnInit() {}

  writeAi() {
    if (this.aiText == '') {
      this.msg.error('Enter keyword to genrate the content with AI');
      return;
    }
    this.loading = true;
    this.aiService.askAi(this.aiText, 'Social').subscribe(
      (data: any) => {
        if (data.choices[0].message.content != '') {
          this.aiPost = this.clean(data.choices[0].message.content);
        } else {
          this.msg.success('Something went wrong, Please try again');
        }
        this.loading = false;
      },
      (err) => {
        this.loading = false;
        this.msg.error(err.message);
      },
    );
  }

  clean(paragraph: string) {
    const regex = /^"|"$/g;
    // Replace leading quotes with an empty string
    return paragraph.replace('  ', '').replace(regex, '');
  }

  acceptContent() {
    this.msg.success('Content accepted');
    this.generatedContent.emit(this.aiPost);
  }
}
