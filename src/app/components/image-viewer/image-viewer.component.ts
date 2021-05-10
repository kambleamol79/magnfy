import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.css']
})
export class ImageViewerComponent implements OnInit {
  @Input() open: boolean;
  @Input() imageURL: string;

  @Output() close = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}
