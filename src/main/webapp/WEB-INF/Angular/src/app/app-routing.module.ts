import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {path: 'home', loadChildren: './home-page/home-page.module#HomePageModule'},
  {path: 'user', loadChildren: './user/user.module#UserModule'},
  {path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
