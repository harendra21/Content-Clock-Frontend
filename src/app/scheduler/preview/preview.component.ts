import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from './../../services/api.service';
@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {

  public post: any;
  public social: any;
  public images: any[] = [];


  constructor(private apiService: ApiService, private route: ActivatedRoute) {
    const id = this.route.snapshot.params['id'];

    this.getPost(id)
  }

  getPost(id: any){
    this.apiService.getRequest(`/post/${id}`).subscribe((res: any) => {
      if(res.status == true){
        this.post = res.data.post;
        this.social = res.data.social;
        if (this.post.Medias != ''){
          this.images = this.post.Medias.split(',');
        }
      }
    })
  }

  ngOnInit() {
  }

}