import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent implements OnInit {
  showFlag: boolean = false;
  selectedImageIndex: number = -1;
  imageObject: Array<object> = [{
    image: '../assets/img/dashboard.gif',
    thumbImage: '../assets/img/dashboard.gif',
    alt: 'alt of image',
    title: 'title of image'
}, {
    image: '../assets/img/dashboard.gif', // Support base64 image
    thumbImage: '../assets/img/dashboard.gif', // Support base64 image
    title: 'Image title', //Optional: You can use this key if want to show image with title
    alt: 'Image alt' //Optional: You can use this key if want to show image with alt
}
];
  constructor() { }

  ngOnInit(): void {
  }

  showLightbox(index) {
    this.selectedImageIndex = index;
    this.showFlag = true;
  }
  closeEventHandler() {
    this.showFlag = false;
}


}
