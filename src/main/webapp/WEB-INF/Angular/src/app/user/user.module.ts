import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserProfileComponent} from './user-profile.component';
import {UserRoutingModule} from './user-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../shared/material.module';
import {LogInComponent} from './log-in/log-in.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import { MyPostsComponent } from './my-posts/my-posts.component';
import { TutorialComponent } from './tutorial/tutorial.component';

@NgModule({
  declarations: [UserProfileComponent, LogInComponent, SignUpComponent, MyPostsComponent, TutorialComponent],
  imports: [
    ReactiveFormsModule,
    MaterialModule,
    CommonModule,
    UserRoutingModule

  ]
})
export class UserModule {
}
