import { Component, OnInit } from '@angular/core';
import { AppService } from '../../_services';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent implements OnInit {
  showFlag: boolean = false;
  selectedImageIndex: number = -1;
  imageObject1: Array<object> = [];
  imageObject2: Array<object> = [];
  imageObject3: Array<object> = [];
  imageObject4: Array<object> = [];
  tab1: any = [];
  tab2: any = [];
  tab3: any = [];
  tab4: any = [];
  imageUrl: any = environment.serverUrl + 'files/help_page/';
  constructor(private appService: AppService) { }

  ngOnInit(): void {
    this.getHelpPageData();
  }

  getHelpPageData(){
   
    this.appService.getHelpPageData().subscribe(data => {
      if(data['status']){
        data['data']['result'].filter(item => {
          if(item['tab'] == 0){
            this.imageObject1.push({
                image: this.imageUrl+item['image'],
                thumbImage: this.imageUrl+item['image'],
                alt: item['image'],
                title: item['image']
            });
            this.tab1.push(item);
          }
          if(item['tab'] == 1){
            this.imageObject2.push({
              image: this.imageUrl+item['image'],
              thumbImage: this.imageUrl+item['image'],
              alt: item['image'],
              title: item['image']
          });
            this.tab2.push(item);
          }
          if(item['tab'] == 2){
            this.imageObject3.push({
              image: this.imageUrl+item['image'],
              thumbImage: this.imageUrl+item['image'],
              alt: item['image'],
              title: item['image']
          });
            this.tab3.push(item);
          }
          if(item['tab'] == 3){
            this.imageObject4.push({
              image: this.imageUrl+item['image'],
              thumbImage: this.imageUrl+item['image'],
              alt: item['image'],
              title: item['image']
          });
            this.tab4.push(item);
          }
        });
      }
      
    });
  }

  showLightbox(index) {
    this.selectedImageIndex = index;
    this.showFlag = true;
  }
  closeEventHandler() {
    this.showFlag = false;
  }


}
