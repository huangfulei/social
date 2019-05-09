import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    SimpleChanges,
    ViewChild
} from '@angular/core';
import {IPost} from '../../model/Post';
import {MatDialog} from '@angular/material';
import {LogInReminderComponent} from '../../pop-up/log-in-reminder/log-in-reminder.component';
import {UserStatusService} from '../../core/user-status.service';
import {CommentsService} from '../../core/comments.service';
import {SubSink} from 'subsink';
import {IUser} from '../../model/User';
import {Observable} from 'rxjs';
import {PostDataService} from '../../core/post-data.service';
import {numberValidator} from '../../user/sign-up/sign-up.component';
import {CommentsComponent} from './comments/comments.component';

@Component({
    selector: 'app-post',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostComponent implements OnInit, OnChanges, OnDestroy {

    @Input() post: IPost;
    @Input() user: IUser;
    @ViewChild(CommentsComponent)
    private commentsComponent: CommentsComponent;
    private subs = new SubSink();
    likeStatus: string;
    dislikeStatus: string;
    saveStatus: string;
    expended = false;
    displayContent: string;
    showSpinner = false;
    like = 'LIKE';
    save = 'SAVE';
    comment = 'COMMENT';
    commentCollapsed = true;
    totalNumberOfComments: Observable<number>;


    // showSpinner = true;

    getPostDetail() {
        console.log('post detail could not be needed');
        // this.router.navigate(['/post', 1]);
    }

    onLikeClick() {

        if (this.likeStatus == null && this.dislikeStatus == null) {
            this.likeStatus = 'accent';
            this.like = 'LIKED';
            this.post.numberOfLikes++;
        } else if (this.dislikeStatus != null) {
            this.dislikeStatus = null;
            this.post.numberOfLikes++;
        } else {
            this.likeStatus = null;
            this.like = 'LIKE';
            this.post.numberOfLikes--;
        }
        this.postService.updateTotalNumberOfLikes(this.post.id, this.post.numberOfLikes).subscribe();
    }

    onDislikeClick() {
        if (this.likeStatus == null && this.dislikeStatus == null) {
            this.dislikeStatus = 'accent';
            this.post.numberOfLikes--;
        } else if (this.likeStatus != null) {
            this.likeStatus = null;
            this.like = 'LIKE';
            this.post.numberOfLikes--;
        } else {
            this.dislikeStatus = null;
            this.post.numberOfLikes++;
        }
        this.postService.updateTotalNumberOfLikes(this.post.id, this.post.numberOfLikes).subscribe();
    }

    onCommentClick() {
        if (!this.userStatus.isLoggedIn) {
            this.openLoginReminder();
        }
        this.commentCollapsed = !this.commentCollapsed;
        if (this.commentCollapsed) {
            this.comment = 'COMMENT';
        } else {
            this.comment = 'COLLAPSE';
        }
        // whenever click comment button, update total number of comments
        this.totalNumberOfComments = this.commentsService.getTotalCountOfComments(this.post.id);
        console.log('comment button was clicked');
    }

    onShareClick() {
        if (!this.userStatus.isLoggedIn) {
            this.openLoginReminder();
        }
        console.log('share button was clicked');

    }

    onSaveClick() {
        if (!this.userStatus.isLoggedIn) {
            this.openLoginReminder();
        }

        if (this.saveStatus == null) {
            this.saveStatus = 'primary';
            this.save = 'SAVED';
        } else {
            this.saveStatus = null;
            this.save = 'SAVE';
        }

        console.log('save button was clicked');

    }

    openLoginReminder() {
        const dialogRef = this.dialog.open(LogInReminderComponent, {
            width: '600px',
            height: '200px',
        });
    }

    readMore = () => {
        if (this.expended) {
            this.displayContent = this.displayContent.substr(0, 140);
            this.expended = false;
        } else {
            this.displayContent = this.post.content;
            this.expended = true;
        }
    };

    constructor(private dialog: MatDialog,
                private userStatus: UserStatusService,
                private commentsService: CommentsService,
                private postService: PostDataService) {
    }

    ngOnInit() {
        console.log('post component init');

        // display post content
        if (this.post.content.length > 140) {
            this.displayContent = this.post.content.substr(0, 140);
            this.expended = false;
        } else {
            this.displayContent = this.post.content;

        }

        // get total count of comments
        this.totalNumberOfComments = this.commentsService.getTotalCountOfComments(this.post.id);

    }

    ngOnChanges(changes: SimpleChanges): void {
        console.log('post changed');
    }

    ngOnDestroy(): void {
        this.subs.unsubscribe();
    }

}
