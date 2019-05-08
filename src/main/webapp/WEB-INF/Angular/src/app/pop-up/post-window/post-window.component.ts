import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {DialogData} from '../../model/DialogData';
import {FormBuilder} from '@angular/forms';
import {IPost} from '../../model/Post';
import {PostDataService} from '../../core/post-data.service';
import {SubSink} from 'subsink';
import {Router} from '@angular/router';

@Component({
  selector: 'app-post-window',
  templateUrl: './post-window.component.html',
  styleUrls: ['./post-window.component.css']
})
export class PostWindowComponent implements OnInit, OnDestroy {

  private subs = new SubSink();
  postForm = this.fb.group({
    title: [''],
    content: ['']
  });

  constructor(
    public dialogRef: MatDialogRef<PostWindowComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: DialogData,
    private fb: FormBuilder,
    private postDataService: PostDataService,
    private router: Router
  ) {
    // disable window close when click outside
    this.dialogRef.disableClose = true;
  }

  ngOnInit() {
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    // create a new post instance
    const newPost: IPost = {
      author: this.dialogData.userName,
      title: this.postForm.get('title').value,
      tags: ['developer'],
      content: this.postForm.get('content').value
    };

    // save the new post to the server
    this.subs.sink = this.postDataService.addPost(newPost)
      .subscribe(
        () => console.log('saving post: '),
        (err: any) => console.log(err),
        () => {

          // call subject to update total number of posts
          this.subs.sink = this.postDataService.updateTotalNumberOfPosts().subscribe();
        }
      );

    this.dialogRef.close();
    console.log('saved a new post: ' + newPost + ' !');

  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
