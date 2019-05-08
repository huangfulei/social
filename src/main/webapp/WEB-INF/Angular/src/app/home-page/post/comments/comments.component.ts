import {Component, HostListener, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {IComment} from '../../../model/Comment';
import {CommentsService} from '../../../core/comments.service';
import {SubSink} from 'subsink';
import {IUser} from '../../../model/User';
import {UserStatusService} from '../../../core/user-status.service';
import {MatPaginator, MatPaginatorIntl, PageEvent} from '@angular/material';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
})
export class CommentsComponent implements OnInit, OnDestroy {

  @Input() postID;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  comments: IComment[];
  private subs = new SubSink();
  user = {} as IUser;

  // MatPaginator Inputs
  length: Observable<number>;
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 20, 50];

  // MatPaginator OutPut
  onPageChange(pageEvent: PageEvent) {
    // get data when page event emitted
    this.subs.sink = this.commentsService.getComments(this.postID, pageEvent.pageSize, pageEvent.pageIndex)
      .subscribe((data: IComment[]) => {
        this.comments = data;
      });
  }

  addComment(content: HTMLTextAreaElement) {
    const newComment = {} as IComment;
    newComment.content = content.value;
    newComment.name = this.user.name;
    newComment.postID = this.postID;

    // save comment to DB
    this.subs.sink = this.commentsService.saveComment(newComment)
      .subscribe(() => {
          // set value to empty after submit comment
          content.value = '';
          // focus to prevent submit empty comment
          content.focus();
        },
        (err) => {
        },
        () => {
          this.ngOnInit();
          this.paginator.firstPage();
        });
  }

  // when scroll to the bottom
  @HostListener('window:scroll', [])
  onScroll(): void {
    if (this.bottomReached()) {

    }
  }


  // check if scrolled to the bottom
  bottomReached(): boolean {
    return (window.innerHeight + window.scrollY) >= document.body.offsetHeight;
  }

  constructor(private commentsService: CommentsService,
              private userService: UserStatusService,
              private paginatorService: MatPaginatorIntl) {
  }

  ngOnInit() {

    console.log('init comments component with post id=' + this.postID);

    // to trigger single comment component
    document.getElementsByTagName('textarea').item(0).focus();

    this.user = this.userService.getLoggedInUser();

    // set total number of comments for page navigation
    this.length = this.commentsService.getTotalCountOfComments(this.postID);

    // get comments for this post by post id
    this.subs.sink = this.commentsService.getComments(this.postID, 5, 0)
      .subscribe((data: IComment[]) => {
        this.comments = data;
      });

  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
