import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {PostWindowComponent} from '../../pop-up/post-window/post-window.component';
import {Router} from '@angular/router';
import {IUser} from '../../model/User';
import {SubSink} from 'subsink';
import {UserStatusService} from '../user-status.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit, OnDestroy {

  title = 'Master Home';
  isLoggedIn = false;
  postWindowOpened = false;
  user = {} as IUser;
  subs = new SubSink();

  openPostWindow(): void {
    const dialogRef = this.dialog.open(PostWindowComponent, {
      width: '700px',
      height: '500px',
      data: {userName: this.user.name}
    });

    this.postWindowOpened = true;

    this.subs.sink = dialogRef.afterClosed().subscribe(result => {
      console.log('the dialog was closed');
      this.postWindowOpened = false;
    });
  }

  onLogOut() {
    this.userStatusService.setLoggedIn(false);
    this.isLoggedIn = false;
    this.route.navigate(['/home']);
    localStorage.clear();

  }

  constructor(public dialog: MatDialog,
              private route: Router,
              private userStatusService: UserStatusService) {
  }

  ngOnInit() {

    console.log('nav bar init');

    // get user detail and user status after logging in
    /*    this.userStatusService.loggedInUserObservable$
          .subscribe((data: IUser) => {
            this.user = data;
            this.isLoggedIn = this.userStatusService.isLoggedIn;
            console.log('logged in user name is: '+ this.user.name);
          });*/

    // keep user logged in after refresh
    this.isLoggedIn = this.userStatusService.isLoggedIn;
    this.user = this.userStatusService.getLoggedInUser();

    // get user when user logged in
    this.subs.sink = this.userStatusService.loggedInUserObservable$
      .subscribe((data: IUser) => {
        this.user = data;
        this.isLoggedIn = true;
        console.log('get user finished for nav bar');
      });
  }

  ngOnDestroy(): void {
    this.subs.sink.unsubscribe();
  }

}
