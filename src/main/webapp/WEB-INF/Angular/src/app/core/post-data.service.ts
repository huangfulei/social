import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {IPost} from '../model/Post';
import {ClonerService} from './cloner.service';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {numberValidator} from '../user/sign-up/sign-up.component';
import {tap} from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class PostDataService {


  posts: IPost[] = [];

  private postPostUrl = '/postPost';
  private getAllPostsUrl = '/getRecommendedPosts/';
  private getTotalNumberOfPostsUrl = '/getTotalNumberOfPosts';
  private updateTotalNumberOfLikesUrl = '/updateTotalNumberOfLikes/';
  private getSavedPost = '/getSavedPost/';

  // private newPostSubject$ = new BehaviorSubject<IPost[]>(this.posts);
  private newTotalNumberOfPosts$ = new Subject<number>();
  // newPostObservable$ = this.newPostSubject$.asObservable();
  newTotalNumberOfPostsObservable$ = this.newTotalNumberOfPosts$.asObservable();

  // immutableStories = List<IStory[]>(this.http.get<IStory[]>(this.getAllStoriesUrl));

  addPost(newPost: IPost): Observable<void> {
    return this.http.post<void>(this.postPostUrl, newPost, httpOptions);
  }

  getRecommendedPosts(size: number, index: number): Observable<IPost[]> {
    console.log('it\'s getting data from server');

    const posts = this.http.get<IPost[]>(this.getAllPostsUrl + size + '/' + index);
    /*.subscribe(
      (data: IStory[]) => this.stories = JSON.parse(JSON.stringify((data))),
      (error: any) => console.log(error),
      () => console.log('getting data finished' + this.stories)
    );*/
    // const stories = JSON.parse(JSON.stringify(this.http.get<IStory[]>(this.getAllStoriesUrl)));
    // const stories = this.cloneService.deepClone<IStory[]>(this.http.get<IStory[]>(this.getAllStoriesUrl));
    // const stories = this.cloneService.deepClone<IStory[]>(this.http.get<IStory[]>(this.getAllStoriesUrl));
    // return of(stories);

    return posts;
  }

  getTotolNumberOfPosts(): Observable<number> {
    return this.http.get<number>(this.getTotalNumberOfPostsUrl);
  }

  updateTotalNumberOfPosts(): Observable<number> {
    return this.http.get<number>(this.getTotalNumberOfPostsUrl).pipe(
      tap((data: number) => {
        this.newTotalNumberOfPosts$.next(data);
      }));
  }

  updateTotalNumberOfLikes(postID: number, numberOfLikes: number): Observable<void> {
    return this.http.put<void>(this.updateTotalNumberOfLikesUrl + postID, numberOfLikes, httpOptions);
  }

/*  getSavedPost(userID: number): Observable<IPost[]> {
    return this.http.get();
  }*/

  /*  getFollowedStories(): Observable<IStory[]> {
      return this.http.get();
    }

    getUserInfo(): Observable<IUser> {
      return this.http.get();
    }

    updateStory(story: IStory) {
      this.http.put();
    }

    deleteStories(story: IStory[]){
      this.http.delete();
    }*/
  constructor(private http: HttpClient, private cloneService: ClonerService) {
  }


}
