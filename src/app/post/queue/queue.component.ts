import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ApiService } from 'src/app/auth/service/api.service';
import { Modal, ModalOptions } from 'flowbite';
import { AddNewComponent } from '../add-new/add-new.component';


@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.css'],
})
export class QueueComponent implements OnInit, AfterViewInit {
  @Input() connection: any = {};
  @ViewChild('modalcontainer') modalElement!: ElementRef;
  @ViewChild('popupmodal') popupModalElement!: ElementRef;
  @ViewChild(AddNewComponent) addNewComponent!: AddNewComponent;
  public schedules: any = [];
  public isVisible: boolean = false;
  public isClosed: boolean = false;
  public slot: any;
  public posts: any[] = [];
  public postId: number = 0;
  public loading: boolean = true;
  public formModal: any;
  public confirmModal: any;
  public isEdit: boolean = false;
  constructor(
    private modalService: NzModalService,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private msgService: NzMessageService,
  ) {}

  ngAfterViewInit(): void {

    const formModalOptions: ModalOptions = {
      closable: true,
      onHide: () => {
        this.closeFormModal()
      },
      onShow: () => {
        this.isClosed = false;
      },
    };


    this.formModal = new Modal(this.modalElement.nativeElement, formModalOptions);
    this.confirmModal = new Modal(this.popupModalElement.nativeElement);
    this.route.queryParams.subscribe((params) => {
      if (params['edit']) {
        this.editPost(params['edit']);
        this.isEdit = true;
      }
    });
  }

  closeFormModal() {
    if(!this.isClosed) this.formModal.show();
    this.confirmModal.show()
  }


  sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  async runLoopWithDelay() {
    for (let i = 0; i < 50; i++) {
      if (Object.keys(this.connection).length !== 0) {
        this.getScheduledPosts(this.connection.ConnectionId);
        break;
      }
      await this.sleep(100);
    }
  }
  ngOnInit() {
    this.runLoopWithDelay();
    
  }
  addNew(dateTime: any = null) {
    if (dateTime == null) {
      dateTime = new Date();
    }
    this.slot = new Date(dateTime);
    this.addNewComponent.reloadComponent(this.slot, this.postId);
    this.formModal.show();
  }

  editPost(postId: any) {
    this.postId = parseInt(postId);
    this.addNewComponent.reloadComponent(this.slot, this.postId);
    this.formModal.show();
  }

  handleCloseModel(): void {
    this.isClosed = true;
    this.formModal.hide();
    this.postId = 0;
    this.confirmModal.hide();
    this.addNewComponent.reloadComponent(this.slot, this.postId);
    if(this.isEdit) this.router.navigate([`/post/create/${this.connection.ConnectionId}`], { queryParams: { "action": "queue" } })
    
  }

  getScheduledPosts(connection_id: string) {
    this.apiService
      .getRequest(
        `/social-posts?connectionId=${connection_id}&status=scheduled&action=queue`,
      )
      .subscribe(
        (res: any) => {
          this.loading = false;
          if (res.status) {
            this.posts = res.data;
          } else {
            this.msgService.error(res.message);
          }
        },
        (err) => {
          this.loading = false;
          this.msgService.error(err.message);
        },
      );
  }
}
