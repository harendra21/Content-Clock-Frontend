import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/auth/service/api.service';
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  public posts: any[] = [];


  constructor(private apiService: ApiService) { }

  ngOnInit() {

    this.getPosts();

  }

  getPosts() {
    this.apiService.getRequest(`/posts`).subscribe((res: any) => {
      if (res.status){
        this.posts = res.data.data;
      }
    });
  }

  getSocialConnectionName(socialConnection: string) {
    switch (socialConnection) {
      case 'facebook_page':
        return 'Facebook';
      case 'twitter':
        return 'Twitter';
      case 'linkedin_profile':
        return 'Linkedin';
      case 'instagram':
        return 'Instagram';
      default:
        return socialConnection;
    }
  }

}