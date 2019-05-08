import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SlidesComponent} from './slides/slides.component';
import {PostModule} from './post/post.module';
import {HomePageComponent} from './home-page.component';
import {FormsModule} from '@angular/forms';
import {HomePageRoutingModule} from './home-page-routing.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {LogInReminderComponent} from '../pop-up/log-in-reminder/log-in-reminder.component';

@NgModule({
  declarations: [HomePageComponent, SlidesComponent, LogInReminderComponent],
  imports: [
    CommonModule,
    PostModule,
    FlexLayoutModule,
    FormsModule,
    HomePageRoutingModule,
  ],
  entryComponents: [LogInReminderComponent]
})
export class HomePageModule {
}
