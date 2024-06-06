import { Component, Input, OnChanges, SimpleChanges, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

declare var twttr: any;

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.css'],
})
export class TweetComponent {

  @Input() tweetUrl: string = "";
  @ViewChild('tweetContainer', { static: false }) tweetContainer!: ElementRef;

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.tweetUrl && this.tweetUrl) {
      this.loadTweet();
    }
  }

  ngAfterViewInit() {
    // Ensures the tweet is loaded after the view initializes
    if (this.tweetUrl) {
      this.loadTweet();
    }
  }

  loadTweet() {
    if (this.tweetContainer) {
      this.tweetContainer.nativeElement.innerHTML = ''; // Clear previous tweet
      twttr.widgets.createTweet(
        this.extractTweetId(this.tweetUrl),
        this.tweetContainer.nativeElement,
        {
          conversation: 'none', // Hide the thread
          cards: 'hidden', // Hide media cards
          align: 'center' // Center the tweet
        }
      ).then((el: any) => {
        console.log('Tweet displayed.');
      }).catch((error: any) => {
        console.error('Error displaying tweet:', error);
      });
    }
  }

  extractTweetId(url: string): string {
    const match = url.match(/status\/(\d+)/);
    return match ? match[1] : '';
  }

}
