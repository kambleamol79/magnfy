import { Component, OnInit } from '@angular/core';
import { AppService } from '../../_services';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  allPosts: any = [];
  filteredPosts: any = [];
  filterMethodForm: FormGroup;
  isSortingMethodsRetrieved: boolean = false;
  constructor(private appService: AppService, public fb: FormBuilder) {}

  ngOnInit(): void {
    this.getMySortingMethodsData();
    this.getAllSocialPosts();
    
  }

  getMySortingMethodsData(){
    this.appService.getMySortingMethods().subscribe(res => {      
      if(res['status'] == true && res['data']['data'].length > 0){
        console.log(res['data']['data'][0]);
        let sortingMethods = res['data']['data'][0];
        let group={}
        Object.keys(sortingMethods).map((key)=>{ 
          if((key == 'facebook' || key == 'twitter' || key == 'instagram') && sortingMethods[key] == true){
            group[key]=new FormControl(sortingMethods[key]);
          }
        });
        group['allposts']=new FormControl(true);
        console.log(group);
        this.filterMethodForm = new FormGroup(group);
        this.isSortingMethodsRetrieved = true;
        this.getAllSocialPosts();
      }
    });
  }

  sortPostsData(order: any) {
    if(order == 'desc'){
      this.allPosts.sort((a, b) => {
        return <any>new Date(b.postCreationDate) - <any>new Date(a.postCreationDate);
      });
    }

    if(order == 'asc'){
      this.allPosts.sort((a, b) => {
        return <any>new Date(a.postCreationDate) - <any>new Date(b.postCreationDate);
      });
    }
  }

  AllPosts(e: any){    
    if(e.srcElement.checked == true){
      this.filteredPosts = [];
      if(this.filterMethodForm.controls['facebook']){
        this.filterMethodForm.controls['facebook'].patchValue(true);
        this.filterMethodForm.controls['facebook'].updateValueAndValidity();
      }
      if(this.filterMethodForm.controls['twitter']){
        this.filterMethodForm.controls['twitter'].patchValue(true);
        this.filterMethodForm.controls['twitter'].updateValueAndValidity();
      }
      if(this.filterMethodForm.controls['instagram']){
        this.filterMethodForm.controls['instagram'].patchValue(true);
        this.filterMethodForm.controls['instagram'].updateValueAndValidity();
      }
      this.filteredPosts =  this.allPosts;
    }
  }

  facebookPosts(e: any){
    this.filteredPosts = [];
    if(e.srcElement.checked == false){
      this.filteredPosts =  this.allPosts.filter((item) => {  
        if((this.filterMethodForm.controls['instagram'] && this.filterMethodForm.controls['instagram'].value == true) && item.postType == 'instagram'){
          return item;
        }  
        
        if((this.filterMethodForm.controls['twitter'] && this.filterMethodForm.controls['twitter'].value == true) && item.postType == 'twitter'){
          return item;
        }       
      });
    }else{
      this.filteredPosts =  this.allPosts.filter((item) => {
        if(item.postType == 'facebook'){
          return item;
        }   
        if((this.filterMethodForm.controls['instagram'] && this.filterMethodForm.controls['instagram'].value == true) && item.postType == 'instagram'){
          return item;
        }  
        
        if((this.filterMethodForm.controls['twitter'] && this.filterMethodForm.controls['twitter'].value == true) && item.postType == 'twitter'){
          return item;
        }        
      });      
    }
  }

  twitterPosts(e: any){
    this.filteredPosts = [];
    if(e.srcElement.checked == false){
      this.filteredPosts =  this.allPosts.filter((item) => {
        if((this.filterMethodForm.controls['instagram'] && this.filterMethodForm.controls['instagram'].value == true) && item.postType == 'instagram'){
          return item;
        }        
        if(( this.filterMethodForm.controls['facebook'] && this.filterMethodForm.controls['facebook'].value == true) && item.postType == 'facebook'){
          return item;
        }          
      });
    }else{
      this.filteredPosts =  this.allPosts.filter((item) => {
        if(item.postType == 'twitter'){
          return item;
        } 
        if((this.filterMethodForm.controls['instagram'] && this.filterMethodForm.controls['instagram'].value == true) && item.postType == 'instagram'){
          return item;
        }
        
        if(( this.filterMethodForm.controls['facebook'] && this.filterMethodForm.controls['facebook'].value == true) && item.postType == 'facebook'){
          return item;
        }        
      });
    }
  }

  instagramPosts(e: any){
    this.filteredPosts = [];
    if(e.srcElement.checked == false){
      this.filteredPosts =  this.allPosts.filter((item) => {
        if((this.filterMethodForm.controls['twitter'] && this.filterMethodForm.controls['twitter'].value == true) && item.postType == 'twitter'){
          return item;
        }        
        if(( this.filterMethodForm.controls['facebook'] && this.filterMethodForm.controls['facebook'].value == true) && item.postType == 'facebook'){
          return item;
        }  
      });
    }else{
      this.filteredPosts =  this.allPosts.filter((item) => {
        if(item.postType == 'instagram'){
          return item;
        }  
        if((this.filterMethodForm.controls['twitter'] && this.filterMethodForm.controls['twitter'].value == true) && item.postType == 'twitter'){
          return item;
        }        
        if(( this.filterMethodForm.controls['facebook'] && this.filterMethodForm.controls['facebook'].value == true) && item.postType == 'facebook'){
          return item;
        }      
      });
    }
  }

  getAllSocialPosts(){
    this.appService.getAllSocialPosts().subscribe(res => {
      console.log(res);
      if(res.status == true){
        this.allPosts = res.data.data;
        this.filteredPosts = res.data.data;
      }
    });
  }

  deletePost(postId){
    if(confirm('Are you sure, you want to remove this post?')){
      this.appService.deletePost(postId).subscribe(res => {
        console.log(res);
        this.getAllSocialPosts();
      });
    }
    
  }

  sedPostByEmail(post){
    let data = { post: post}
    this.appService.sedPostByEmail(data).subscribe(res => {
      console.log(res);
    });
  }

}
