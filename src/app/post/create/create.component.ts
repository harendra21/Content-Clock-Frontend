import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ApiService } from 'src/app/auth/service/api.service';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {


  public connection: any = {}
  public action: string = ''


  constructor(private route: ActivatedRoute, private apiService: ApiService, private msg: NzMessageService, private router: Router) {
    // this.router.routeReuseStrategy.shouldReuseRoute = () => true;
    this.route.queryParams.subscribe((params) => {
      this.action = params['action'];

        if (this.action == undefined) {
          this.router.navigate([`/post/create/${this.route.snapshot.params['id']}`], {
            queryParams: { action: 'queue' },
          });
        }else{
          this.GetConnectionInfo(this.route.snapshot.params['id']);
        }
    });
    
  }

  ngOnInit() {
    

  }

  GetConnectionInfo(connection_id : string) {
    this.apiService.getRequest(`/connections/${connection_id}`).subscribe((res: any) => {
      if (res.status){
        this.connection = res.data
      }else{
        this.msg.error(res.message)
      }
    }, err => {
      this.msg.error(err.message)
    })
  }


}