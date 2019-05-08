import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {IComment} from '../model/Comment';
import {Observable, Subject} from 'rxjs';
import {tap} from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  private saveCommentUrl = '/server/saveComment';
  private getCommentsUrl = '/server/getComments/';
  private getTotalCountOfCommentsUrl = '/server/getTotalCountOfComments/';

  private commentSubject$ = new Subject<IComment[]>();
  commentsDetail$ = this.commentSubject$.asObservable();

  saveComment(comment: IComment): Observable<any> {
    return this.http.post<any>(this.saveCommentUrl, comment, httpOptions);
  }

  getComments(postID: number, pageSize: number, index: number): Observable<IComment[]> {
    return this.http.get<IComment[]>(this.getCommentsUrl + postID + '/' + pageSize + '/' + index);
  }

  getTotalCountOfComments(postID: number): Observable<number> {
    return this.http.get<number>(this.getTotalCountOfCommentsUrl + postID);
  }

  constructor(private http: HttpClient) {
  }
}
