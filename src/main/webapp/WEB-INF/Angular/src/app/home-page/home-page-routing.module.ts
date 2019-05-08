import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomePageComponent} from './home-page.component';
import {PostComponent} from './post/post.component';

const routes: Routes = [
  {
    path: '', component: HomePageComponent,
    children: [
      {path: '', component: PostComponent},
      {path: 'followed', component: PostComponent},
      {path: 'recommended', component: PostComponent},
    ]
  },
  {
    path: ':username', component: HomePageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {
}
