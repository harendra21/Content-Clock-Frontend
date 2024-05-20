import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-facebook-card',
  templateUrl: './facebook-card.component.html',
  styleUrls: ['./facebook-card.component.css']
})
export class FacebookCardComponent implements OnInit {
  @Input() name: any;
  @Input() profile_image: any;
  @Input() images: any;
  @Input() postDate: any;
  @Input() postContent: any;
  @Input() status: any = null

  constructor() { }

  ngOnInit() {
    if (this.images.length > 0) this.images = this.images.split(',');
  }

}