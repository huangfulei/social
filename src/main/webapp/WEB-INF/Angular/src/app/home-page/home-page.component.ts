import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {IPost} from '../model/Post';
import {PostDataService} from '../core/post-data.service';
import {SubSink} from 'subsink';
import {IUser} from '../model/User';
import {UserStatusService} from '../core/user-status.service';
import {MatPaginator, MatPaginatorIntl, PageEvent} from '@angular/material';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit, OnDestroy {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  private subs = new SubSink();
  posts: IPost[];
  user = {} as IUser;
  error: any;

  // MatPaginator Inputs
  length: number;
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 20, 50];

  // MatPaginator OutPut
  onPageChange(pageEvent: PageEvent) {
    console.log('page navigation happened');
    // get data when page event emitted
    this.getPosts(pageEvent.pageSize, pageEvent.pageIndex);

  }

  getPosts(pageSize: number, pageIndex: number) {
    this.subs.sink = this.postData.getRecommendedPosts(pageSize, pageIndex).subscribe(
      (data: IPost[]) => {
        this.posts = data;
        console.log('length of the posts: ' + data.length);
      },
      (error: any) => this.error = error,
      () => {
        this.subs.sink = this.postData.updateTotalNumberOfPosts().subscribe();
      }
    );
  }

  constructor(private postData: PostDataService,
              private userStatusService: UserStatusService) {
  }

  ngOnInit() {
    console.log('init home page');

    // get post when initialise the page
    this.getPosts(5, 0);

    // get post when new post posted
    /*    this.postData.newPostObservable$
          .subscribe((data: IPost[]) => {
            this.posts = JSON.parse(JSON.stringify(data));
            console.log('new post length is: ' + this.posts.length);
          });*/

    // keep user info after refresh, get user from local storage
    this.user = this.userStatusService.getLoggedInUser();

    // get user when logged in
    this.userStatusService.loggedInUserObservable$
      .subscribe((data: IUser) => {
        this.user = data;
        console.log('user info: ' + data.email + data.name);
        console.log('get user finished for home page');
      });

    // get total number of posts
    this.subs.sink = this.postData.getTotolNumberOfPosts()
      .subscribe((data: number) => {

        this.length = data;
        console.log('first time get total number of posts: ' + this.length);
      });

    // update total number of posts when a new post comes
    this.subs.sink = this.postData.newTotalNumberOfPostsObservable$
      .subscribe((data: number) => {
        this.length = data;
        console.log('number after post' + data);
      });
  }

  ngOnDestroy() {

    this.subs.unsubscribe();

  }
}
