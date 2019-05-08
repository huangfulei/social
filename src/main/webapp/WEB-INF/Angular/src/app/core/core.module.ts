import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavComponent} from './nav/nav.component';
import {RouterModule} from '@angular/router';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MaterialModule} from '../shared/material.module';
import {PostWindowComponent} from '../pop-up/post-window/post-window.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [NavComponent, PostWindowComponent],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    MaterialModule,
  ],
  exports: [
    NavComponent
  ],
  entryComponents: [PostWindowComponent]
})
export class CoreModule {
}
