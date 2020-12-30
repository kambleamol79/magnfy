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
  constructor(private appService: AppService, public fb: FormBuilder) {}

  ngOnInit(): void {
    this.getAllSocialPosts();

    this.filterMethodForm = this.fb.group({      
      allposts: [true],
      facebook: [true],
      twitter: [true],
      instagram: [true],      
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

  AllPosts(){   
    this.filteredPosts = [];
    if(this.filterMethodForm.controls['allposts'].value == true){
      this.filterMethodForm.controls['facebook'].patchValue(true);
      this.filterMethodForm.controls['facebook'].updateValueAndValidity();
      this.filterMethodForm.controls['twitter'].patchValue(true);
      this.filterMethodForm.controls['twitter'].updateValueAndValidity();
      this.filterMethodForm.controls['instagram'].patchValue(true);
      this.filterMethodForm.controls['instagram'].updateValueAndValidity();
      this.filteredPosts =  this.allPosts;
    }else{

      if(this.filterMethodForm.controls['facebook'].value == false){
        this.filteredPosts =  this.allPosts.filter((item) => {
          if(item.postType != 'facebook'){
            return item;
          }        
        });
      }else{
        this.filteredPosts =  this.allPosts.filter((item) => {
          if(item.postType == 'facebook'){
            return item;
          }        
        });
      }

      if(this.filterMethodForm.controls['twitter'].value == false){
        this.filteredPosts =  this.allPosts.filter((item) => {
          if(item.postType != 'twitter'){
            return item;
          }        
        });
      }else{
        this.filteredPosts =  this.allPosts.filter((item) => {
          if(item.postType == 'twitter'){
            return item;
          }        
        });
      } 
  
      if(this.filterMethodForm.controls['instagram'].value == false){
        this.filteredPosts =  this.allPosts.filter((item) => {
          if(item.postType != 'instagram'){
            return item;
          }        
        });
      }else{
        this.filteredPosts =  this.allPosts.filter((item) => {
          if(item.postType == 'instagram'){
            return item;
          }        
        });
      }
    }   
  }

  facebookPosts(){
    this.filteredPosts = [];
    if(this.filterMethodForm.value.facebook == false){
      this.filteredPosts =  this.allPosts.filter((item) => {
        if(item.postType == 'facebook'){
          return item;
        }  
        if(this.filterMethodForm.controls['instagram'].value == true && item.postType == 'instagram'){
          return item;
        }  
        
        if(this.filterMethodForm.controls['twitter'].value == true && item.postType == 'twitter'){
          return item;
        }       
      });
    }else{
      this.filteredPosts =  this.allPosts.filter((item) => {
        if(item.postType != 'facebook'){
          return item;
        }        
      });      
    }
  }

  twitterPosts(){
    this.filteredPosts = [];
    if(this.filterMethodForm.value.twitter == false){
      this.filteredPosts =  this.allPosts.filter((item) => {
        if(item.postType == 'twitter'){
          return item;
        }
        if(this.filterMethodForm.controls['instagram'].value == true && item.postType == 'instagram'){
          return item;
        }  
        
        if(this.filterMethodForm.controls['facebook'].value == true && item.postType == 'facebook'){
          return item;
        }          
      });
    }else{
      this.filteredPosts =  this.allPosts.filter((item) => {
        if(item.postType != 'twitter'){
          return item;
        }        
      });
    }
  }

  instagramPosts(){
    this.filteredPosts = [];
    if(this.filterMethodForm.value.instagram == false){
      this.filteredPosts =  this.allPosts.filter((item) => {
        if(item.postType == 'instagram'){
          return item;
        }
        if(this.filterMethodForm.controls['twitter'].value == true && item.postType == 'twitter'){
          return item;
        }        
        if(this.filterMethodForm.controls['facebook'].value == true && item.postType == 'facebook'){
          return item;
        }  
      });
    }else{
      this.filteredPosts =  this.allPosts.filter((item) => {
        if(item.postType != 'instagram'){
          return item;
        }        
      });
    }
    console.log(this.filterMethodForm.value);
  }

  getAllSocialPosts(){
    this.appService.getAllSocialPosts().subscribe(res => {
      console.log(res);
      if(res.status == true){
        this.allPosts = res.data.data;
        this.AllPosts();
      }
    });
  }

  deletePost(postId){
    this.appService.deletePost(postId).subscribe(res => {
      console.log(res);
      this.getAllSocialPosts();
    });
  }

}
