import {Component, Input, OnInit} from '@angular/core';
import {IComment} from '../../../model/Comment';

@Component({
  selector: 'app-single-comment',
  templateUrl: './single-comment.component.html',
  styleUrls: ['./single-comment.component.css']
})
export class SingleCommentComponent implements OnInit {

  @Input() comment: IComment;
  @Input() postID: number;

  getPostDetail() {
  }

  onLikeClick() {
  }

  onCommentClick() {
  }

  constructor() {
  }

  ngOnInit() {

    console.log('init single comment');

  }

}
