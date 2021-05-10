import { Component, OnInit } from '@angular/core';
import { AppService } from '../../_services';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent implements OnInit {  
  tab1: any = [];
  tab2: any = [];
  tab3: any = [];
  tab4: any = [];
  imageUrl: any = environment.serverUrl + 'files/help_page/';
  
  viewerOpen = false;

  constructor(private appService: AppService) { }

  ngOnInit(): void {
    this.getHelpPageData();
  }

  getHelpPageData(){
   
    this.appService.getHelpPageData().subscribe(data => {
      if(data['status']){
        data['data']['result'].filter(item => {
          if(item['tab'] == 0){            
            this.tab1.push(item);
          }
          if(item['tab'] == 1){
            this.tab2.push(item);
          }
          if(item['tab'] == 2){
            this.tab3.push(item);
          }
          if(item['tab'] == 3){
            this.tab4.push(item);
          }
        });
      }
      
    });
  }

  getImageUrl(image){
    return this.imageUrl+image;
  }

}
