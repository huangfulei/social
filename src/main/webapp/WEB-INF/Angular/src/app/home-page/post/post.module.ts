import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PostDetailComponent} from './post-detail/post-detail.component';
import {PostRoutingModule} from './post-routing.module';
import {PostComponent} from './post.component';
import {MaterialModule} from '../../shared/material.module';
import {CommentsComponent} from './comments/comments.component';
import {SingleCommentComponent} from './single-comment/single-comment.component';

@NgModule({
  declarations: [PostComponent, PostDetailComponent, CommentsComponent, SingleCommentComponent],
  imports: [
    CommonModule,
    PostRoutingModule,
    MaterialModule,
  ],
  exports: [PostComponent, MaterialModule]
})
export class PostModule {
}
