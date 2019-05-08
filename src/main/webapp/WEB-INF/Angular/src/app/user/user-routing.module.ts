import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserProfileComponent} from './user-profile.component';
import {LogInComponent} from './log-in/log-in.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {MyPostsComponent} from './my-posts/my-posts.component';
import {TutorialComponent} from './tutorial/tutorial.component';

const routes: Routes = [
  {path: '', component: UserProfileComponent},
  {path: 'login', component: LogInComponent},
  {path: 'sign_up', component: SignUpComponent},
  {path: 'posts', component: MyPostsComponent},
  {path: 'tutorial', component: TutorialComponent},
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
