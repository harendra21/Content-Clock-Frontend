import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pinterest-card',
  templateUrl: './pinterest-card.component.html',
  styleUrls: ['./pinterest-card.component.css']
})
export class PinterestCardComponent implements OnInit {
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