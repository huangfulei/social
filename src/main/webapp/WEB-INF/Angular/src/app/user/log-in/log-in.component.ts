import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserDataService} from '../../core/user-data.service';
import {IUser} from '../../model/User';
import {SubSink} from 'subsink';
import {EventBusService} from '../../core/event-bus.service';
import {AuthService} from '../../core/auth.service';
import {UserStatusService} from '../../core/user-status.service';

@Component({
    selector: 'app-login',
    templateUrl: './log-in.component.html',
    styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit, OnDestroy {

    subs = new SubSink();
    user = {} as IUser;
    authStatus: boolean;
    loginForm: FormGroup;

    constructor(private fb: FormBuilder,
                private route: Router,
                private userDataService: UserDataService,
                private eventBus: EventBusService,
                private userStatusService: UserStatusService,
                private authService: AuthService) {
    }

    ngOnInit() {
        console.log('init log in component');
        this.loginForm = this.fb.group({
            email: [''],
            password: [''],
        });
    }

    onSubmit() {

        this.user.email = this.loginForm.get('email').value;
        this.user.password = this.loginForm.get('password').value;

        // pass user to backend and check with user info in DB, return user status and info
        this.subs.sink = this.authService.authUserDetail(this.user)
            .subscribe(data => {
                    console.log('user authenticated:', data);
                },
                (error => console.log('error happened')),
                () => {

                    if (this.user.statusCode === 0) {

                        console.log('user logged in successfully');

                        // this user has all the user info from DB
                        this.userStatusService.setLoggedInUser(this.user);

                        this.route.navigate(['/home']);
                    }

                });

    }


    ngOnDestroy(): void {
        this.subs.unsubscribe();
    }


}
