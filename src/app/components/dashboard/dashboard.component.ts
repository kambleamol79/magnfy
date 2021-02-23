import { Component, OnInit } from '@angular/core';
import { FacebookService, AuthService, AppService } from '../../_services';
import { NgxSpinnerService } from "ngx-spinner";
import { ActivatedRoute, Params } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public pieChartLabels: string[] = ['Facebook', 'Twitter', 'Instagram'];
  public pieChartData:number[];
  public pieChartType:string = 'doughnut';
  public chartColors: any[] = [
    { 
      backgroundColor:["#6f52ed", "#33d69f", "#ffb800"]
    }];

    public options = {        
      cutoutPercentage: 80
    };

  facebookPosts: any = [];
  fbPosts: any = [];
  instagramPosts: any = [];
  articles: any = [];
  tweets: any = [];
  trendingUsers: any = [];
  allUsers: any = [];
  allPosts: any = [];
  totalTrendingUsersCount: any = 0;
  userSocialData: any;
  serverImageUrl: any = environment.serverUrl + 'files/articles/';
  userImageUrl: any = environment.serverUrl + 'files/';

  constructor(private route: ActivatedRoute, private facebookService: FacebookService, private appService: AppService, public authService: AuthService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getMyInterests();
    this.getMySocialAccountsData();
    this.getAllArticles();
    this.getAllUsers();
    this.getChartData();

  }

  getChartData(){

    let allPostsCount: number = this.facebookPosts.length + this.tweets.length + this.instagramPosts.length;

    this.pieChartData = [ ( this.facebookPosts.length / allPostsCount ) * 100, ( this.tweets.length / allPostsCount ) * 100, ( this.instagramPosts.length / allPostsCount ) * 100 ];

    //console.log(allPostsCount);

  }

 //Facebook
  getFacebookFeeds(facebookAccessToken){
    if(facebookAccessToken){
      this.facebookService.getFacebookProfile(facebookAccessToken).subscribe(fbProfile=>{
      this.facebookService.getFacebookPosts(facebookAccessToken).subscribe(fbposts=>{
        fbposts.data.forEach(item => {
          this.facebookPosts.push(item);
          this.allPosts.push({'userName': fbProfile.name, 'userId': fbProfile.id, 'profilePicture': fbProfile.picture.data.url, 'postId': item.id, 'postMessage': item['message'], 'postImageUrl': item.full_picture, 'postCreationDate': new Date(item.created_time), 'postType': 'facebook'});
          this.sortPostsData('desc');
        });
      });
    });
    }
    this.getChartData();
  }

  getMyInterests(){
    this.appService.getInterestSocialDataByAuth().subscribe(res => {
      //console.log(res);
      res['data']['result'].forEach(item => {
        if(item['instagram_token']){
          this.getInstagramPostsByToken(item['instagram_token']);
          this.getTwtterFeeds(item['twitter_token'], item['twitter_social_name'], item['twitter_id']);
          this.getFacebookFeeds(item['facebook_token']);
        }
      });

    });
  }

  //Twitter
  getTwtterFeeds(twitter_token, twitter_social_name, twitter_id){
    if(twitter_token){
        this.authService.getTwits(twitter_token, twitter_social_name, twitter_id).subscribe(tweets => {
          tweets['data']['data'].forEach(item => {
            //console.log(item);
            this.tweets.push(item);
            let postImage = item.entities.media ? item.entities.media[0].media_url_https : '';
            this.allPosts.push({'userName': item.user.name, 'userId': item.user.id, 'profilePicture': item.user.profile_image_url_https, 'postId': item.id, 'postMessage': item['text'], 'postImageUrl': postImage, 'postCreationDate': new Date(item.created_at), 'postType': 'twitter'});
            this.getChartData();
            this.sortPostsData('desc');
            this.spinner.hide();
          });
        });
      /*followers['data']['data']['users'].forEach(element => {
      });*/
        /*this.authService.getFollowers(twitter_token).subscribe(followers =>{
          
        });*/
    }
  }

  getMySocialAccountsData(){
    this.appService.getMySocialAccounts().subscribe(res => {
      if(res['status'] == true){
        this.userSocialData = res['data'];
        
        if(this.userSocialData['data'].length > 0){
          this.getFacebookFeeds(this.userSocialData['data'][0]['facebook_token']);
          this.getTwtterFeeds(this.userSocialData['data'][0]['twitter_token'], this.userSocialData['data'][0]['twitter_social_name'], this.userSocialData['data'][0]['twitter_id']);

          if(this.userSocialData['data'][0]['instagram_token'] == null || this.userSocialData['data'][0]['instagram_token'] == 'null'){
            this.getInstagramAccessToken();
          }else{
            this.getInstagramPostsByToken(this.userSocialData['data'][0]['instagram_token']);
          }
        }else{
          this.getInstagramAccessToken();
        }
      }
    });
  }

  getInstagramAccessToken(){

    let InstagramAccountDetails = {
      instagram_id: '',
      instagram_social_name: '',
      instagram_token: '',
      instagram_token_expiry_date: '',
    }

    this.route.queryParams.subscribe((params: Params) => {
      if(params['code']){
        this.facebookService.getInstgramAccessToken(params['code']).subscribe(res=> {
          if(res['access_token']){
            InstagramAccountDetails['instagram_id'] =  res['user_id'];
            this.facebookService.instgramLongLivedToken(res['access_token']).subscribe(res => {
              if(res['access_token']){
                this.getInstagramPostsByToken(res['access_token'])
                localStorage.setItem('instagramToken', res['access_token']);
                InstagramAccountDetails['instagram_token'] =  res['access_token'];
                InstagramAccountDetails['instagram_token_expiry_date'] =  res['expires_in'];
                if(this.userSocialData['data'].length == 0){
                  this.appService.addMySocialAccounts(InstagramAccountDetails).subscribe(res => {
                    //console.log(res);
                  });
                }else{
                  this.appService.updateSocialAccounts(InstagramAccountDetails).subscribe(res => {
                    //console.log(res);
                  });
                }

              }
            });
          }
        });   
      }        
    });
  }

  //Instgram
  getInstagramPostsByToken(instagramTkn){
      this.facebookService.getInstgramPosts(instagramTkn).subscribe(posts => {
        this.instagramPosts =this.instagramPosts.concat(posts['data']);
        posts['data'].filter(item =>{
          this.allPosts.push({'userName': item.username, 'postId': item.id, 'postMessage': item['caption'], 'postImageUrl': item.media_url, 'postCreationDate': new Date(item.timestamp), 'postType': 'instagram'});
        });
        this.sortPostsData('desc');
        if(posts['data'].length > 0 && posts['paging']['next']){
          this.facebookService.getInstgramMorePosts(posts['paging']['next']).subscribe(morePosts => {
            if(morePosts['data']){
              this.instagramPosts = this.instagramPosts.concat(morePosts['data']);
              morePosts['data'].filter(item =>{
                this.allPosts.push({'userName': item.username, 'postId': item.id, 'postMessage': item['caption'], 'postImageUrl': item.media_url, 'postCreationDate': new Date(item.timestamp), 'postType': 'instagram'});
              });
              this.getChartData();
              this.sortPostsData('desc');
            }
          });
        }      
      });
  }

  getAllArticles(){
   
    this.appService.getArticles().subscribe(articles => {
      if(articles['status']){
        this.articles = articles['data']['result'];
      }
      
    });
  }

  getAllUsers(){
   
    this.appService.getAllUsers().subscribe(users => {
      //console.log(users);
      if(users['status']){
        this.allUsers = users['data']['users'];
        this.getTrendingUers();
      }
      
    });
  }

  getTrendingUers(){
    this.appService.getTrendingUers().subscribe(users => {
      let userss: any = users['data']['result'];
      this.trendingUsers = this.keys(userss);

      this.trendingUsers.sort((a,b) => {
        if ( a.count > b.count ){
          return -1;
        }
        if ( a.count < b.count ){
          return 1;
        }
        return 0;
      });
 
      //console.log(this.trendingUsers);

      this.trendingUsers.forEach((element, key) => {
        this.totalTrendingUsersCount = this.totalTrendingUsersCount + element['count'];
        this.allUsers.forEach(user => {
          if(user['email'] == element['email']){
            this.trendingUsers[key]['image'] = user['image']
          }
        });
        //console.log(this.trendingUsers);
      });
    });
  }

  getTrendingUsersByOrder(order: any){
    if(order == 'asc'){
      this.trendingUsers.sort((a,b) => {
        if ( a.count < b.count ){
          return -1;
        }
        if ( a.count > b.count ){
          return 1;
        }
        return 0;
      });
    }

    if(order == 'desc'){
      this.trendingUsers.sort((a,b) => {
        if ( a.count > b.count ){
          return -1;
        }
        if ( a.count < b.count ){
          return 1;
        }
        return 0;
      });
    }
    
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

  sortArticleData(order: any) {
    if(order == 'desc'){
      this.articles.sort((a, b) => {
        return <any>new Date(b.created_at) - <any>new Date(a.created_at);
      });
    }

    if(order == 'asc'){
      this.articles.sort((a, b) => {
        return <any>new Date(a.created_at) - <any>new Date(b.created_at);
      });
    }

  }

  keys(object) {
    return Object.keys(object).map((key) => ({ 'email': key, 'count': object[key].length, 'name': object[key][0]['name'] }));
  }

  savePost(post){
    this.appService.addSocialPost(post).subscribe(res => {
      console.log(res);
    });
  }

  sedPostByEmail(post){
    let data = { post: post}
    this.appService.sedPostByEmail(data).subscribe(res => {
      console.log(res);
    });
  }


}
