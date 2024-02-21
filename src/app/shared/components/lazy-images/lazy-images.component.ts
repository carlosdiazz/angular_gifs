import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'shared-lazy-images',
  templateUrl: './lazy-images.component.html',
})
export class LazyImagesComponent implements OnInit {
  ngOnInit(): void {
    if (!this.urlImage) throw new Error('Url is required');
  }

  @Input()
  public urlImage!: string;

  @Input()
  public alt: string = '';

  public hasLoaded: boolean = false;

  onLoad() {
    setTimeout(() => {
      this.hasLoaded = true;
    }, 1000);
  }
}
